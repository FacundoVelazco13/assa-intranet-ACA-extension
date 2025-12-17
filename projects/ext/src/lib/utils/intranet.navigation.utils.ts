/* eslint-disable license-header/header */

import { OymNodeType } from '../models/node-types.enum';

export function getIntranetRouteByType(type: string): string {
  switch (type) {
    case OymNodeType.Procedimiento:
      return '/intranet/oym/procedimientos/details';
    case OymNodeType.Politica:
      return '/intranet/oym/politicas/details';
    case OymNodeType.FormularioRegistro:
      return '/intranet/oym/formularios/details';
    // default
    default:
      return '';
  }
}
