/* eslint-disable license-header/header */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IntranetSearchAction, IntranetSearchActionTypes, IntranetSearchByTermAction } from '../actions/search.actions';
import { Router } from '@angular/router';
import { SearchQueryBuilderService } from '@alfresco/adf-content-services';
import { SearchOptionIds } from '@alfresco/aca-shared/store';
import { formatSearchTerm, SearchNavigationService } from '@alfresco/aca-content';

@Injectable()
export class SearchEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly queryBuilder = inject(SearchQueryBuilderService);
  private readonly searchNavService = inject(SearchNavigationService);

  search$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<IntranetSearchAction>(IntranetSearchActionTypes.Search),
        map(() => {
          this.searchNavService.saveRoute(this.router.url);
          this.router.navigate(['/intranet/search']);
        })
      ),
    { dispatch: false }
  );

  searchByTerm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<IntranetSearchByTermAction>(IntranetSearchActionTypes.SearchByTerm),
        map((action) => {
          const query = formatSearchTerm(action.payload, this.queryBuilder.config['app:fields']);
          const libItem = action.searchOptions.find((item) => item.id === SearchOptionIds.Libraries);
          const librarySelected = !!libItem && libItem.value;
          // Por ahora lo dejo en '/search-libraries' debido a que escapa de nuestras rutas /intranet.
          // aunque podría deshabilitar esa selección previamente.
          this.queryBuilder.navigateToSearch(query, librarySelected ? '/search-libraries' : '/intranet/search');
        })
      ),
    { dispatch: false }
  );
}
