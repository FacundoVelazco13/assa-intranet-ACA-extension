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

export function getAssocByType(source: string, target: string): string {
  if (source === target) {
    const area = source.split(':')[0];
    return `${area}:association`;
  }
  return 'assa:association';
}

/**
 * Determina si un nodo es un record basado en su tipo.
 * Agregar aquí los tipos de nodos que deben mostrarse como records.
 */
export function isRecordNodeType(nodeType: string): boolean {
  const recordTypes = ['hys:ppye'];
  return recordTypes.includes(nodeType);
}
