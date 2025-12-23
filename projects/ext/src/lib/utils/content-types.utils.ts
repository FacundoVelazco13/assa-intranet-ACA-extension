/* eslint-disable license-header/header */

import { OymNodeType } from '../models/node-types.enum';

export function getNameByTypeCode(type: string): string {
  switch (type) {
    case OymNodeType.Procedimiento:
      return 'Procedimiento';
    case OymNodeType.Politica:
      return 'Política';
    case OymNodeType.FormularioRegistro:
      return 'Formulario de Registro';
    // default
    default:
      return 'Documento';
  }
}
