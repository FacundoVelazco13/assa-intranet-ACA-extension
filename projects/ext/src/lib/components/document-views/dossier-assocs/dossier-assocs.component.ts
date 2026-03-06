/* eslint-disable license-header/header */
import {
  DataColumnComponent,
  DataColumnListComponent,
  PaginationComponent,
  PaginationModel,
  CustomEmptyContentTemplateDirective
} from '@alfresco/adf-core';
import { Component, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Node, NodeEntry, NodePaging } from '@alfresco/js-api';
import { PaginationDirective } from '@alfresco/aca-shared';
import { NavigateUrlAction } from '@alfresco/aca-shared/store';
import { DocumentListComponent, ContentActionListComponent, ContentActionComponent } from '@alfresco/adf-content-services';
import { DocumentListPresetRef, DynamicColumnComponent } from '@alfresco/adf-extensions';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomContentApiService } from '../../../services/content/custom-content-api.service';
import { Store } from '@ngrx/store';
import { DeleteAssociationAction, DELETE_ASSOCIATION_SUCCESS } from '../../../store/actions/association.actions';
import { Actions, ofType } from '@ngrx/effects';
import { filter } from 'rxjs/operators';
import { getIntranetRouteByType } from '../../../utils/intranet.navigation.utils';
import { isRecordNodeType } from '../../../utils/content-types.utils';

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
    ContentActionComponent,
    CustomEmptyContentTemplateDirective
  ],
  selector: 'aca-dossier-assocs',
  templateUrl: './dossier-assocs.component.html',
  styleUrl: './dossier-assocs.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DossierAssocsComponent implements OnInit {
  private _errorTranslationKey = 'APP.MESSAGES.ERRORS.MISSING_CONTENT';
  nodePage: NodePaging;
  isLoading = true;
  pagination: PaginationModel = { maxItems: 25, skipCount: 0 };

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

  private readonly customContentApi: CustomContentApiService = inject(CustomContentApiService);
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  ngOnInit() {
    this.loadAssociations();

    this.actions$
      .pipe(
        ofType(DELETE_ASSOCIATION_SUCCESS),
        filter((action: any) => action.payload.sourceNodeId === this.nodeId)
      )
      .subscribe(() => {
        this.loadAssociations();
      });
    this.customContentApi.associationCreated.subscribe((assoc) => {
      if (assoc.sourceId === this.nodeId) {
        this.loadAssociations();
      }
    });
  }

  loadAssociations() {
    this.isLoading = true;
    this.customContentApi
      .listTargetAssociations(this.nodeId)
      .then((associationResult) => {
        this.nodePage = associationResult;
      })
      .catch((error) => {
        console.error('Error al cargar las asociaciones', error);
        this.nodePage = null;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  handleNodeClick(event: Event) {
    const node = (event as CustomEvent).detail?.node as NodeEntry;
    if (node?.entry) {
      if (node.entry.isFolder) {
        const route = getIntranetRouteByType(node.entry.nodeType);

        if (isRecordNodeType(node.entry.nodeType)) {
          this.store.dispatch(new NavigateUrlAction(`${route}/record/${node.entry.id}`));
        } else {
          this.store.dispatch(new NavigateUrlAction(`${route}/details/${node.entry.id}`));
        }
      } else {
        this.previewFile.emit(node);
      }
    }
  }
  customNavigateAction($event: any) {
    const node = $event.value as NodeEntry;
    if (node?.entry) {
      if (node.entry.isFolder) {
        const route = getIntranetRouteByType(node.entry.nodeType);
        if (isRecordNodeType(node.entry.nodeType)) {
          this.store.dispatch(new NavigateUrlAction(`${route}/record/${node.entry.id}`));
        } else {
          this.store.dispatch(new NavigateUrlAction(`${route}/details/${node.entry.id}`));
        }
      } else {
        this.previewFile.emit(node);
      }
    }
  }
  deleteAssoc($event: any) {
    const nodeEntry = $event.value as NodeEntry;
    this.store.dispatch(new DeleteAssociationAction({ sourceNodeId: this.nodeId, targetNode: nodeEntry }));
  }
  trackByColumnId(_: number, obj: DocumentListPresetRef): string {
    return obj.id;
  }
  onError(error: HttpErrorResponse) {
    console.error('DossierAssocsComponent - onError', error);
  }
}
