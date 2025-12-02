/* eslint-disable license-header/header */
import { Action } from '@ngrx/store';

export const ADD_FILES = 'ADD_FILES';

export class AddFilesAction implements Action {
  readonly type = ADD_FILES;
}
