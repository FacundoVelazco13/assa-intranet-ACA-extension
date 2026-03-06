/* eslint-disable license-header/header */
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { IntranetRouterActionTypes, NavigateToIntranetFolder } from '../actions/intranet-router.actions';
import { getIntranetRouteByType } from '../../utils/intranet.navigation.utils';
import { isRecordNodeType } from '../../utils/content-types.utils';

@Injectable()
export class IntranetRouterEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  navigateToFolder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<NavigateToIntranetFolder>(IntranetRouterActionTypes.NavigateToIntranetFolder),
        map((action) => {
          if (action.payload?.entry) {
            const intranetRoute = getIntranetRouteByType(action.payload.entry.nodeType);
            const id = action.payload.entry.id;
            if (isRecordNodeType(action.payload.entry.nodeType)) {
              void this.router.navigate([`${intranetRoute}/record`, id]);
              return;
            }
            void this.router.navigate([`${intranetRoute}/details`, id]);
          }
        })
      ),
    { dispatch: false }
  );
}
