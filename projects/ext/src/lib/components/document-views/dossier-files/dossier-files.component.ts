/* eslint-disable license-header/header */
import { DataColumnComponent, DataColumnListComponent, PaginationComponent, NotificationService } from '@alfresco/adf-core';
import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Node, NodeEntry } from '@alfresco/js-api';
import { ContentApiService, PaginationDirective, NodePermissionService } from '@alfresco/aca-shared';
import { CopyNodesAction, DownloadNodesAction, MoveNodesAction, ShareNodeAction } from '@alfresco/aca-shared/store';
import { DocumentListComponent, ContentActionListComponent, ContentActionComponent, UploadService } from '@alfresco/adf-content-services';
import { DocumentListPresetRef, DynamicColumnComponent } from '@alfresco/adf-extensions';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  imports: [
    CommonModule,
    PaginationComponent,
    MatProgressSpinnerModule,
    PaginationDirective,
    DynamicColumnComponent,
    DocumentListComponent,
    DataColumnListComponent,
    DataColumnComponent,
    ContentActionListComponent,
    ContentActionComponent
  ],
  selector: 'aca-dossier-files',
  templateUrl: './dossier-files.component.html',
  styleUrl: './dossier-files.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DossierFilesComponent implements OnInit {
  private _errorTranslationKey = 'APP.MESSAGES.ERRORS.MISSING_CONTENT';
  isLoading = true;

  @ViewChild('documentList', { static: false })
  documentList: DocumentListComponent;

  @Input()
  nodeId: string;
  @Input()
  columns: DocumentListPresetRef[] = [];
  node: Node;

  @Output()
  previewFile = new EventEmitter<NodeEntry>();

  get errorTranslationKey(): string {
    return this._errorTranslationKey;
  }

  private readonly contentApi: ContentApiService = inject(ContentApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  private readonly permissions = inject(NodePermissionService);
  private readonly notificationService = inject(NotificationService);
  private readonly uploadService = inject(UploadService);

  ngOnInit() {
    this.contentApi
      .getNode(this.nodeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (node) => {
          this.isLoading = false;
          this.node = node.entry;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error al cargar el nodo', error);
        }
      });
    this.uploadService.fileUploadComplete.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((fileUploadEvent) => {
      if (fileUploadEvent?.data?.entry.parentId === this.nodeId) {
        this.documentList?.reload();
      }
    });
  }
  handleNodeClick(event: Event) {
    const node = (event as CustomEvent).detail?.node as NodeEntry;
    if (node?.entry && !node.entry.isFolder) {
      this.previewFile.emit(node);
    }
  }
  customNavigateAction($event: any) {
    const node = $event.value as NodeEntry;
    if (node?.entry && !node.entry.isFolder) {
      this.previewFile.emit(node);
    }
  }
  downloadFile($event: any) {
    const node = $event.value as NodeEntry;
    this.store.dispatch(new DownloadNodesAction([node]));
  }
  // Por ahora estoy usando la ContentApi, pero lo mejor sería usar acciones.
  deleteFile($event: any) {
    const node = $event.value as NodeEntry;

    if (!this.canDeleteNode(node.entry)) {
      this.notificationService.showError('No tiene permisos para eliminar este archivo.');
      return;
    }
    if (this.isNodeLocked(node.entry)) {
      this.notificationService.showError('El archivo esta bloqueado, alguien puede estar editandolo.');
      return;
    }
    // Delete directly without navigation side effects
    this.contentApi.deleteNode(node.entry.id, { permanent: false }).subscribe({
      next: () => {
        this.notificationService.showInfo('Archivo eliminado correctamente');
        this.documentList.reload();
      },
      error: () => {
        this.notificationService.showError('Error al eliminar el archivo');
      }
    });
  }
  copyFile($event: any) {
    const node = $event.value as NodeEntry;
    this.store.dispatch(new CopyNodesAction([node]));
  }
  moveFile($event: any) {
    const node = $event.value as NodeEntry;
    const canDelete = this.canDeleteNode(node.entry);
    const isLocked = this.isNodeLocked(node.entry);
    if (!canDelete) {
      this.notificationService.showError('No tiene permisos para eliminar este archivo.');
      return;
    }
    if (isLocked) {
      this.notificationService.showError('El archivo esta bloqueado, alguien puede estar editandolo.');
      return;
    }
    this.store.dispatch(new MoveNodesAction([node]));
    this.documentList.reload();
  }
  shareFile($event: any) {
    const node = $event.value as NodeEntry;
    if (!node?.entry) {
      return;
    }
    this.notificationService.showInfo('Intento de compartir');
    this.store.dispatch(new ShareNodeAction(node));
  }
  canCreateNode(node: Node): boolean {
    return this.permissions.check(node, ['create']);
  }
  canDeleteNode(node: Node): boolean {
    return this.permissions.check(node, ['delete']);
  }
  isNodeLocked(node: Node): boolean {
    return !!(node as any).isLocked;
  }
  trackByColumnId(_: number, obj: DocumentListPresetRef): string {
    return obj.id;
  }
  onError(error: HttpErrorResponse) {
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
