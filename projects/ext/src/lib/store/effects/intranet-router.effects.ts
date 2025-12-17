/* eslint-disable license-header/header */
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Node, PathInfo } from '@alfresco/js-api';
import { map } from 'rxjs/operators';
import { IntranetRouterActionTypes, NavigateToIntranetFolder } from '../actions/intranet-router.actions';
import { getIntranetRouteByType } from '../../utils/intranet.navigation.utils';

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
            this.navigateToIntranetFolder(action.payload.entry);
          }
        })
      ),
    { dispatch: false }
  );

  private navigateToIntranetFolder(node: Node) {
    const { path, nodeType, id } = node;

    if (path?.name && path?.elements) {
      const isLibraryPath = this.isLibraryContent(path);

      const parent = path.elements[path.elements.length - 1];
      const area = isLibraryPath ? '/libraries' : '/personal-files';
      if (isLibraryPath) {
        const intranetRoute = getIntranetRouteByType(nodeType);
        if (intranetRoute) {
          this.router.navigate([intranetRoute, id]);
          return;
        }
        // parent.id could be 'Site' folder or child as 'documentLibrary'
        this.router.navigate([area, parent.name === 'Sites' ? {} : id]);
      } else {
        this.router.navigate(['/personal-files', node.id]);
      }
    }
  }

  private isLibraryContent(path: PathInfo): boolean {
    return path && path.elements.length >= 2 && path.elements[1].name === 'Sites';
  }
}
