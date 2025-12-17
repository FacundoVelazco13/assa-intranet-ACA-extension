/* eslint-disable license-header/header */
import { Action } from '@ngrx/store';
import { NodeEntry } from '@alfresco/js-api';

export enum IntranetRouterActionTypes {
  NavigateToIntranetFolder = 'NAVIGATE_INTRANET'
}

export class NavigateToIntranetFolder implements Action {
  readonly type = IntranetRouterActionTypes.NavigateToIntranetFolder;

  constructor(public payload: NodeEntry) {}
}
