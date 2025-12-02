/* eslint-disable license-header/header */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, mergeMap, filter, catchError, take } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { ConfirmDialogComponent, NotificationService } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material/dialog';
import { CustomContentApiService } from '../../services/content/custom-content-api.service';
import {
  ADD_ASSOCIATION,
  DELETE_ASSOCIATION,
  DeleteAssociationAction,
  DeleteAssociationSuccessAction,
  DeleteAssociationErrorAction,
  DELETE_ASSOCIATION_SUCCESS,
  DELETE_ASSOCIATION_ERROR,
  AddAssociationAction
} from '../actions/association.actions';
import { Store } from '@ngrx/store';
import { AppStore, getCurrentFolder } from '@alfresco/aca-shared/store';

@Injectable()
export class AssociationEffects {
  private actions$ = inject(Actions);
  private customContentApi = inject(CustomContentApiService);
  private notificationService = inject(NotificationService);
  private dialog = inject(MatDialog);
  private store = inject(Store<AppStore>);

  addAssociation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<AddAssociationAction>(ADD_ASSOCIATION),
        map((action) => {
          if (action.payload) {
            this.customContentApi.selectNodesForAssociation(action.payload, action.configuration?.focusedElementOnCloseSelector);
          } else {
            this.store
              .select(getCurrentFolder)
              .pipe(take(1))
              .subscribe((currentFolder) => {
                if (currentFolder) {
                  this.customContentApi.selectNodesForAssociation({ entry: currentFolder }, action.configuration?.focusedElementOnCloseSelector);
                }
              });
          }
        })
      ),
    { dispatch: false }
  );

  deleteAssociation$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteAssociationAction>(DELETE_ASSOCIATION),
      concatMap((action) => {
        // Usar el componente de confirmación de ADF
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Eliminar asociación',
            message: `"¿Está seguro que desea eliminar la asociación con '${action.payload.targetNode.entry.name}'?"`,
            yesLabel: 'Eliminar',
            noLabel: 'Cancelar'
          },
          minWidth: '400px',
          maxWidth: '600px'
        });
        return dialogRef.afterClosed().pipe(
          filter((confirmed) => confirmed === true),
          mergeMap(() =>
            from(this.customContentApi.deleteAssociation(action.payload.sourceNodeId, action.payload.targetNode.entry.id)).pipe(
              map(
                () =>
                  new DeleteAssociationSuccessAction({
                    sourceNodeId: action.payload.sourceNodeId,
                    targetNodeId: action.payload.targetNode.entry.id
                  })
              ),
              catchError((error) => of(new DeleteAssociationErrorAction({ error })))
            )
          )
        );
      })
    )
  );

  deleteAssociationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<DeleteAssociationSuccessAction>(DELETE_ASSOCIATION_SUCCESS),
        map(() => {
          this.notificationService.showInfo('EXT.DELETE_ASSOCIATION.SUCCESS');
        })
      ),
    { dispatch: false }
  );

  deleteAssociationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<DeleteAssociationErrorAction>(DELETE_ASSOCIATION_ERROR),
        map((action) => {
          console.error('Error deleting association:', action.payload.error);
          this.notificationService.showError('EXT.DELETE_ASSOCIATION.ERROR');
        })
      ),
    { dispatch: false }
  );
}
