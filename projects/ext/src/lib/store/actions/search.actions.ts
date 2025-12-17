/* eslint-disable license-header/header */
import { Action } from '@ngrx/store';
import { SearchOptionModel } from '@alfresco/aca-shared/store';

export enum IntranetSearchActionTypes {
  Search = 'INTRANET-SEARCH',
  SearchByTerm = 'INTRANET-SEARCH_BY_TERM'
}

export class IntranetSearchAction implements Action {
  readonly type = IntranetSearchActionTypes.Search;
}

export class IntranetSearchByTermAction implements Action {
  readonly type = IntranetSearchActionTypes.SearchByTerm;
  constructor(
    public payload: string,
    public searchOptions?: SearchOptionModel[]
  ) {}
}
