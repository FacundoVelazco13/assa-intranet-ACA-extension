/* eslint-disable license-header/header */
import {
  CustomEmptyContentTemplateDirective,
  DataColumnComponent,
  DataColumnListComponent,
  PaginationComponent,
  ShowHeaderMode
} from '@alfresco/adf-core';
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Node, NodeEntry, PathElement } from '@alfresco/js-api';
import { NodeActionsService, DocumentListDirective } from '@alfresco/aca-content';
import {
  ContextActionsDirective,
  GenericErrorComponent,
  InfoDrawerComponent,
  PageComponent,
  PageLayoutComponent,
  PaginationDirective,
  ToolbarComponent
} from '@alfresco/aca-shared';
import { SetCurrentFolderAction, showLoaderSelector } from '@alfresco/aca-shared/store';
import { debounceTime } from 'rxjs/operators';
import {
  BreadcrumbComponent,
  DocumentListComponent,
  FileUploadEvent,
  FilterSearch,
  NodesApiService,
  ShareDataRow
} from '@alfresco/adf-content-services';
import { DocumentListPresetRef, DynamicColumnComponent } from '@alfresco/adf-extensions';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'aca-intranet-page.component',
  imports: [
    CommonModule,
    TranslatePipe,
    GenericErrorComponent,
    DocumentListDirective,
    ContextActionsDirective,
    PaginationComponent,
    MatProgressSpinnerModule,
    InfoDrawerComponent,
    PaginationDirective,
    PageLayoutComponent,
    ToolbarComponent,
    DynamicColumnComponent,
    BreadcrumbComponent,
    DocumentListComponent,
    DataColumnListComponent,
    DataColumnComponent,
    CustomEmptyContentTemplateDirective
  ],
  templateUrl: './intranet-page.component.component.html',
  styleUrl: './intranet-page.component.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class IntranetPageComponentComponent extends PageComponent implements OnInit, OnDestroy {
  isValidPath = true;
  selectedNode: NodeEntry;
  queryParams = null;
  showLoader$ = this.store.select(showLoaderSelector);
  columns: DocumentListPresetRef[] = [];
  isFilterHeaderActive = false;

  // Verificar utilidad de estos métodos.
  private nodePath: PathElement[];
  private _errorTranslationKey = 'APP.MESSAGES.ERRORS.MISSING_CONTENT';

  // 2. Inyectamos los servicios necesarios con `inject`
  private readonly nodesApi = inject(NodesApiService);
  private readonly nodeActionsService = inject(NodeActionsService);
  private readonly route = inject(ActivatedRoute);

  get errorTranslationKey(): string {
    return this._errorTranslationKey;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const data = this.route.snapshot.data;
    this.title = data.title;
    this.nodesApi
      .getNode(data.root, { relativePath: data.sitePath })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (node) => {
          this.isValidPath = true;
          if (node?.isFolder) {
            this.updateCurrentNode(node);
          } else {
            console.error(`La ruta "${data.sitePath}" no apunta a una carpeta.`);
            this.isValidPath = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(`Error al cargar el nodo por ruta "${data.sitePath}"`, error);
          this.isValidPath = false;
        }
      });

    this.subscriptions = this.subscriptions.concat([
      this.nodeActionsService.contentCopied.subscribe((nodes) => this.onContentCopied(nodes)),
      this.uploadService.fileUploadComplete.pipe(debounceTime(300)).subscribe((file) => this.onFileUploadedEvent(file)),
      this.uploadService.fileUploadDeleted.pipe(debounceTime(300)).subscribe((file) => this.onFileUploadedEvent(file))
    ]);

    // Utiliza la configuración de columnas de /personal-files , no me molesta, al menos hasta que genere otra mas adaptada.
    this.extensions.filesDocumentListPreset$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((preset) => {
      this.columns = preset;
    });

    if (this.queryParams && Object.keys(this.queryParams).length > 0) {
      this.isFilterHeaderActive = true;
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new SetCurrentFolderAction(null));
    super.ngOnDestroy();
  }
  handleNodeClick(event: Event) {
    this.navigateTo((event as CustomEvent).detail?.node);
  }
  navigateTo(node: NodeEntry) {
    if (node?.entry) {
      this.selectedNode = node;
      const { isFolder } = node.entry;
      let id: string;
      if (isFolder) {
        if (node.entry.nodeType === 'app:folderlink') {
          id = node.entry.properties['cm:destination'];
        }
      }
      id = node.entry.id;
      this.documentList.resetNewFolderPagination();
      this.navigate(id);
    }
  }
  navigate(nodeId: string = null) {
    this.router.navigate(['details', nodeId], { relativeTo: this.route });
  }
  customNodePath(node: Node): Node {
    if (!node?.path?.elements) {
      return node;
    }
    const clonedNode: Node = JSON.parse(JSON.stringify(node));
    clonedNode.path.elements = [];
    return clonedNode;
  }

  onFileUploadedEvent(event: FileUploadEvent) {
    const node: NodeEntry = event.file.data;

    // check root and child nodes
    if (node?.entry?.parentId === this.getParentNodeId()) {
      this.reload(this.selectedNode);
      return;
    }

    // check the child nodes to show dropped folder
    if (event && event.file.options.parentId === this.getParentNodeId()) {
      this.displayFolderParent(0, event.file.options.path);
      return;
    }

    if (event?.file.options.parentId) {
      if (this.nodePath) {
        const correspondingNodePath = this.nodePath.find((pathItem) => pathItem.id === event.file.options.parentId);

        // check if the current folder has the 'trigger-upload-folder' as one of its parents
        if (correspondingNodePath) {
          const correspondingIndex = this.nodePath.length - this.nodePath.indexOf(correspondingNodePath);
          this.displayFolderParent(correspondingIndex, event.file.options.path);
        }
      }
    }
  }
  displayFolderParent(index: number, filePath = '') {
    const parentName = filePath.split('/').filter((el) => el)[index];
    const currentFoldersDisplayed = (this.documentList.data.getRows() as ShareDataRow[]) || [];

    const alreadyDisplayedParentFolder = currentFoldersDisplayed.find((row) => row.node.entry.isFolder && row.node.entry.name === parentName);

    if (alreadyDisplayedParentFolder) {
      return;
    }
    this.reload(this.selectedNode);
  }
  onContentCopied(nodes: NodeEntry[]) {
    const newNode = nodes.find((node) => node?.entry?.parentId === this.getParentNodeId());
    if (newNode) {
      this.reload(this.selectedNode);
    }
  }
  private updateCurrentNode(node: Node) {
    this.nodePath = null;

    if (node?.path?.elements) {
      const elements = node.path.elements;
      this.nodePath = elements.map((pathElement) => {
        return { ...pathElement };
      });
    }
    this.node = node;
    this.store.dispatch(new SetCurrentFolderAction(node));
  }
  onFilterSelected(activeFilters: FilterSearch[]) {
    if (activeFilters.length) {
      this.showHeader = ShowHeaderMode.Always;
      this.isFilterHeaderActive = true;
      this.navigateToFilter(activeFilters);
    } else {
      void this.router.navigate(['.'], { relativeTo: this.route });
      this.isFilterHeaderActive = false;
      this.showHeader = ShowHeaderMode.Data;
    }
  }
  navigateToFilter(activeFilters: FilterSearch[]) {
    const objectFromMap = {};
    activeFilters.forEach((filter: FilterSearch) => {
      let paramValue;
      if (filter?.value?.from && filter?.value?.to) {
        paramValue = `${filter.value.from}||${filter.value.to}`;
      } else {
        paramValue = filter.value;
      }
      objectFromMap[filter.key] = paramValue;
    });

    void this.router.navigate([], { relativeTo: this.route, queryParams: objectFromMap });
  }
  onError(error: HttpErrorResponse) {
    this.isValidPath = false;
    if (this.router.url.includes('libraries')) {
      switch (error.status) {
        case 403:
          this._errorTranslationKey = 'APP.BROWSE.LIBRARIES.LIBRARY_NO_PERMISSIONS_WARNING';
          break;
        case 404:
          this._errorTranslationKey = 'APP.BROWSE.LIBRARIES.ERRORS.LIBRARY_NOT_FOUND';
          break;
        default:
          this._errorTranslationKey = 'APP.BROWSE.LIBRARIES.ERRORS.LIBRARY_LOADING_ERROR';
      }
    }
  }
}
