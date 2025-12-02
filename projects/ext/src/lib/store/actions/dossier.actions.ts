/* eslint-disable license-header/header */
import { Action } from '@ngrx/store';

export const CREATE_DOSSIER = 'CREATE_DOSSIER';

export class CreateDossierAction implements Action {
  readonly type = CREATE_DOSSIER;

  constructor() {}
}
