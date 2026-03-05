/* eslint-disable license-header/header */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppStore, getCurrentFolder } from '@alfresco/aca-shared/store';
import { CREATE_RECORD, CreateRecordAction } from '../actions/record.actions';
import { CustomContentManagementService } from '../../services/content/custom-content-management.service';

@Injectable()
export class RecordEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppStore>);
  private contentManager = inject(CustomContentManagementService);

  createRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<CreateRecordAction>(CREATE_RECORD),
        map(() => {
          this.store
            .select(getCurrentFolder)
            .pipe(take(1))
            .subscribe((currentFolder) => {
              if (currentFolder) {
                this.contentManager.CreateRecordDialog(currentFolder.id);
              }
            });
        })
      ),
    { dispatch: false }
  );
}
