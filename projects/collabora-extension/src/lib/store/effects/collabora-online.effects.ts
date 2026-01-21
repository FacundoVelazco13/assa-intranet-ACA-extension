/* eslint-disable license-header/header */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { CollaboraOnlineEdit, COLLABORA_EDIT } from '../actions/collabora-online.actions';
import { CollaboraOnlineService } from '../../services/collabora-online.service';

@Injectable()
export class CollaboraEffects {
  private actions$ = inject(Actions);
  private collaboraOnlineService = inject(CollaboraOnlineService);

  collaboraOnlineEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<CollaboraOnlineEdit>(COLLABORA_EDIT),
        map((action) => {
          if (action.payload) {
            this.collaboraOnlineService.onEdit(action.payload);
          }
        })
      ),
    { dispatch: false }
  );
}
