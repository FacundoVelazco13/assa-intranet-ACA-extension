/* eslint-disable license-header/header */
import { Action } from '@ngrx/store';
import { NodeEntry } from '@alfresco/js-api';
import { ModalConfiguration } from '@alfresco/aca-shared/store';

export const DELETE_ASSOCIATION = 'DELETE_ASSOCIATION';
export const DELETE_ASSOCIATION_SUCCESS = 'DELETE_ASSOCIATION_SUCCESS';
export const DELETE_ASSOCIATION_ERROR = 'DELETE_ASSOCIATION_ERROR';
export const ADD_ASSOCIATION = 'ADD_ASSOCIATION';

export class AddAssociationAction implements Action {
  readonly type = ADD_ASSOCIATION;

  constructor(
    public payload: NodeEntry,
    public configuration?: ModalConfiguration
  ) {}
}

export class DeleteAssociationAction implements Action {
  readonly type = DELETE_ASSOCIATION;

  constructor(
    public payload: {
      sourceNodeId: string;
      targetNode: NodeEntry;
    }
  ) {}
}

export class DeleteAssociationSuccessAction implements Action {
  readonly type = DELETE_ASSOCIATION_SUCCESS;

  constructor(public payload: { sourceNodeId: string; targetNodeId: string }) {}
}

export class DeleteAssociationErrorAction implements Action {
  readonly type = DELETE_ASSOCIATION_ERROR;

  constructor(public payload: { error: any }) {}
}
