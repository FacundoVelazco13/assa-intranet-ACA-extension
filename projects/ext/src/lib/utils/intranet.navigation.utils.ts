/* eslint-disable license-header/header */

import { OymNodeType, HysNodeType, PcNodeType, GiNodeType } from '../models/node-types.enum';

/**
 * Obtiene la ruta de intranet correspondiente a un tipo de nodo.
 * @param type - El tipo de nodo
 * @returns La ruta de navegación o string vacío si no encuentra
 */
export function getIntranetRouteByType(type: string): string {
  switch (type) {
    // OYM types
    case OymNodeType.Procedimiento:
      return '/intranet/oym/procedimientos';
    case OymNodeType.Politica:
      return '/intranet/oym/politicas';
    case OymNodeType.Formulario:
      return '/intranet/oym/formularios';

    // HYS types
    case HysNodeType.Normas:
      return '/intranet/hys/normas';
    case HysNodeType.Procedimientos:
      return '/intranet/hys/procedimientos';
    case HysNodeType.Instructivos:
      return '/intranet/hys/instructivos';
    case HysNodeType.Ppye:
      return '/intranet/hys/fichas';

    // PC types
    case PcNodeType.Micromedicion:
      return '/intranet/pc/micromedicion';
    case PcNodeType.Info:
      return '/intranet/pc/info';

    // GI types
    case GiNodeType.Nota:
      return '/intranet/gi/notas';
    case GiNodeType.Respuesta:
      return '/intranet/gi/respuestas';
    case GiNodeType.Expediente:
      return '/intranet/gi/expedientes';

    // default
    default:
      return '';
  }
}
