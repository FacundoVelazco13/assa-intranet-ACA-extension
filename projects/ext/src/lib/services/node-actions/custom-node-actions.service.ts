/* eslint-disable license-header/header */
import {
  ContentNodeDialogService,
  ContentNodeSelectorComponent,
  ContentNodeSelectorComponentData,
  ContentService,
  NodeAction,
  ShareDataRow
} from '@alfresco/adf-content-services';
import { Node, NodeEntry, Site, SitePaging, SitePagingList } from '@alfresco/js-api';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NodeActionsService } from '@alfresco/aca-content';
import { ThumbnailService, TranslationService } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CustomNodeActionsService {
  isSitesDestinationAvailable = false;

  private readonly contentService: ContentService = inject(ContentService);
  private readonly nodeActionsService: NodeActionsService = inject(NodeActionsService);
  private readonly translation: TranslationService = inject(TranslationService);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly thumbnailService: ThumbnailService = inject(ThumbnailService);

  getCustomContentNodeSelection(action: NodeAction, contentEntities: NodeEntry[], focusedElementOnCloseSelector?: string): Subject<Node[]> {
    const currentParentFolderId = this.nodeActionsService.getEntryParentId(contentEntities[0].entry);

    const customDropdown = new SitePaging({
      list: {
        entries: [
          {
            entry: {
              guid: '-mysites-',
              title: this.translation.instant('APP.BROWSE.LIBRARIES.MENU.MY_LIBRARIES.SIDENAV_LINK.LABEL')
            } as Site
          }
        ]
      } as SitePagingList
    });

    const title = this.nodeActionsService.getTitleTranslation(action, contentEntities);

    this.isSitesDestinationAvailable = false;
    const data: ContentNodeSelectorComponentData = {
      selectionMode: 'single',
      title,
      currentFolderId: currentParentFolderId,
      actionName: action,
      dropdownHideMyFiles: true,
      dropdownSiteList: customDropdown,
      rowFilter: this.rowFilter.bind(this),
      imageResolver: this.imageResolver.bind(this),
      isSelectionValid: this.isSelectionValid.bind(this),
      breadcrumbTransform: this.customizeBreadcrumb.bind(this),
      select: new Subject<Node[]>(),
      excludeSiteContent: ContentNodeDialogService.nonDocumentSiteContent
    };

    this.dialog
      .open(ContentNodeSelectorComponent, {
        data,
        panelClass: 'adf-content-node-selector-dialog',
        width: '630px',
        role: 'dialog'
      })
      .afterClosed()
      .subscribe(() => this.focusAfterClose(focusedElementOnCloseSelector));

    data.select.subscribe({
      complete: this.close.bind(this)
    });

    return data.select;
  }

  private rowFilter(row: ShareDataRow): boolean {
    const node: Node = row.node.entry;
    this.isSitesDestinationAvailable = !!node['guid'];
    // Only show folders, exclude files and folder links
    return !node.isFile && node.nodeType !== 'app:folderlink';
  }

  private imageResolver(row: ShareDataRow): string | null {
    const entry: Node = row.node.entry;
    // Show disabled folder icon if user doesn't have update permissions
    if (!this.contentService.hasAllowableOperations(entry, 'update')) {
      return this.thumbnailService.getMimeTypeIcon('disable/folder');
    }
    return null;
  }

  private isSelectionValid(entry: Node): boolean {
    // Allow selection only if user has create permissions and it's not a site
    return this.hasEntityCreatePermission(entry) && !this.isSite(entry);
  }
  private hasEntityCreatePermission(entry: Node): boolean {
    return this.contentService.hasAllowableOperations(entry, 'create');
  }

  private customizeBreadcrumb(node: Node): Node {
    if (node?.path?.elements) {
      const elements = node.path.elements;

      if (elements.length > 1) {
        if (elements[1].name === 'User Homes') {
          elements.splice(0, 2);
          // Make sure first item is 'Personal Files'
          if (elements[0]) {
            elements[0].name = this.translation.instant('APP.BROWSE.PERSONAL.TITLE');
            elements[0].id = '-my-';
          } else {
            node.name = this.translation.instant('APP.BROWSE.PERSONAL.TITLE');
          }
        } else if (elements[1].name === 'Sites') {
          this.normalizeSitePath(node);
        }
      } else if (elements.length === 1 && node.name === 'Sites') {
        node.name = this.translation.instant('APP.BROWSE.LIBRARIES.MENU.MY_LIBRARIES.TITLE');
        elements.splice(0, 1);
      }
    } else if (node === null && this.isSitesDestinationAvailable) {
      node = {
        name: this.translation.instant('APP.BROWSE.LIBRARIES.MENU.MY_LIBRARIES.TITLE'),
        path: { elements: [] }
      } as any;
    }

    return node;
  }

  private normalizeSitePath(node: Node): void {
    const elements = node.path.elements;
    // Remove 'Company Home'
    elements.splice(0, 1);
    // Replace first item with 'File Libraries'
    elements[0].name = this.translation.instant('APP.BROWSE.LIBRARIES.MENU.MY_LIBRARIES.TITLE');
    elements[0].id = '-mysites-';

    if (this.isSiteContainer(node)) {
      // Rename 'documentLibrary' entry to the target site display name
      node.name = elements[1].name;
      // Remove the site entry
      elements.splice(1, 1);
    } else {
      // Remove 'documentLibrary' in the middle of the path
      const docLib = elements.findIndex((el) => el.name === 'documentLibrary');
      if (docLib > -1) {
        elements.splice(docLib, 1);
      }
    }
  }

  private isSiteContainer(node: Node): boolean {
    if (node?.aspectNames?.length > 0) {
      return node.aspectNames.indexOf('st:siteContainer') >= 0;
    }
    return false;
  }

  private isSite(entry: Node): boolean {
    return !!(entry as any).guid || entry.nodeType === 'st:site' || entry.nodeType === 'st:sites';
  }

  close(): void {
    this.dialog.closeAll();
  }
  private focusAfterClose(focusedElementSelector: string): void {
    if (focusedElementSelector) {
      document.querySelector<HTMLElement>(focusedElementSelector)?.focus();
    }
  }
}
