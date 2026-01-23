/* eslint-disable license-header/header */

import { Action } from '@ngrx/store';
import { NodeEntry } from '@alfresco/js-api';

export const COLLABORA_EDIT = 'COLLABORA_EDIT';
export const COLLABORA_VIEW = 'COLLABORA_VIEW';

export class CollaboraOnlineEdit implements Action {
  readonly type = COLLABORA_EDIT;
  constructor(public payload: NodeEntry) {}
}
export class CollaboraOnlineView implements Action {
  readonly type = COLLABORA_VIEW;
  constructor(public payload: NodeEntry) {}
}
