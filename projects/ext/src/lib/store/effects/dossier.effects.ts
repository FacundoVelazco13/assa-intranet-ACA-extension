/* eslint-disable license-header/header */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppStore, getCurrentFolder } from '@alfresco/aca-shared/store';
import { CREATE_DOSSIER, CreateDossierAction } from '../actions/dossier.actions';
import { CustomContentManagementService } from '../../services/content/custom-content-management.service';

@Injectable()
export class DossierEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppStore>);
  private contentManager = inject(CustomContentManagementService);

  createDossier$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<CreateDossierAction>(CREATE_DOSSIER),
        map(() => {
          this.store
            .select(getCurrentFolder)
            .pipe(take(1))
            .subscribe((currentFolder) => {
              if (currentFolder) {
                this.contentManager.CreateDossierDialog(currentFolder.id);
              }
            });
        })
      ),
    { dispatch: false }
  );
}
