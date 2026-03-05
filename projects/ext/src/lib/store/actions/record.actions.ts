/* eslint-disable license-header/header */
import { Action } from '@ngrx/store';

export const CREATE_RECORD = 'CREATE_RECORD';

export class CreateRecordAction implements Action {
  readonly type = CREATE_RECORD;

  constructor() {}
}
