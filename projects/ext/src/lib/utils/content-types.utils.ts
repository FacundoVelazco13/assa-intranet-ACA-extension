/* eslint-disable license-header/header */

import { Node } from '@alfresco/js-api';
import {
  INTRANET_NODE_TYPES,
  OymNodeType,
  HysNodeType,
  PcNodeType,
  GiNodeType,
  CcNodeType,
  RrhhNodeType,
  PycNodeType,
  AyfNodeType,
  AssaNodeType
} from '../models/node-types.enum';

/**
 * Determina si un nodo es un record basado en su tipo.
 * Agregar aquí los tipos de nodos que deben mostrarse como records.
 */
export function isRecordNodeType(nodeType: string): boolean {
  const recordTypes = [
    HysNodeType.Ppye,
    HysNodeType.ArchivoNorma,
    HysNodeType.ArchivoInstructivo,
    HysNodeType.ArchivoProcedimiento,
    HysNodeType.Content
  ];
  return recordTypes.includes(nodeType as any);
}

/**
 * Verifica si un nodo es un "intranet node" basándose en su tipo.
 * @param node - El nodo a evaluar
 * @returns true si el nodo es de un tipo intranet, false en caso contrario
 */
export function isIntranetNode(node: Node | null | undefined): boolean {
  if (!node?.nodeType) {
    return false;
  }

  return (INTRANET_NODE_TYPES as string[]).includes(node.nodeType);
}

/**
 * Obtiene el nombre descriptivo de un tipo de nodo.
 * @param type - El tipo de nodo
 * @returns El nombre descriptivo
 */
export function getNameByTypeCode(type: string): string {
  switch (type) {
    // OYM types
    case OymNodeType.Procedimiento:
      return 'Procedimiento';
    case OymNodeType.Politica:
      return 'Política';
    case OymNodeType.Formulario:
      return 'Formulario';
    case OymNodeType.ArchivoProcedimiento:
      return 'Archivo de Procedimiento';
    case OymNodeType.ArchivoFormulario:
      return 'Archivo de Formulario';
    case OymNodeType.ArchivoPolitica:
      return 'Archivo de Política';

    // HYS types
    case HysNodeType.Normas:
      return 'Norma';
    case HysNodeType.Instructivos:
      return 'Instructivo';
    case HysNodeType.Procedimientos:
      return 'Procedimiento';
    case HysNodeType.Ppye:
      return 'PPyE';
    case HysNodeType.ArchivoNorma:
      return 'Archivo de Norma';
    case HysNodeType.ArchivoInstructivo:
      return 'Archivo de Instructivo';
    case HysNodeType.ArchivoProcedimiento:
      return 'Archivo de Procedimiento';

    // PC types
    case PcNodeType.Micromedicion:
      return 'Micromedición';
    case PcNodeType.Info:
      return 'Info';
    case PcNodeType.Obra:
      return 'Obra';
    case PcNodeType.ArchivoMicromedicion:
      return 'Archivo de Micromedición';
    case PcNodeType.ArchivoInfo:
      return 'Archivo de Info';
    case PcNodeType.ArchivoObra:
      return 'Archivo de Obra';

    // GI types
    case GiNodeType.Expediente:
      return 'Expediente';
    case GiNodeType.Respuesta:
      return 'Respuesta';
    case GiNodeType.Nota:
      return 'Nota';
    case GiNodeType.ArchivoExpediente:
      return 'Archivo de Expediente';
    case GiNodeType.ArchivoRespuesta:
      return 'Archivo de Respuesta';
    case GiNodeType.ArchivoNota:
      return 'Archivo de Nota';

    // Base folder and content types
    case AssaNodeType.Folder:
    case OymNodeType.Folder:
    case HysNodeType.Folder:
    case PcNodeType.Folder:
    case GiNodeType.Folder:
    case CcNodeType.Folder:
    case RrhhNodeType.Folder:
    case PycNodeType.Folder:
    case AyfNodeType.Folder:
      return 'Contenedor';

    case AssaNodeType.Content:
    case OymNodeType.Content:
    case HysNodeType.Content:
    case PcNodeType.Content:
    case GiNodeType.Content:
    case CcNodeType.Content:
    case RrhhNodeType.Content:
    case PycNodeType.Content:
    case AyfNodeType.Content:
      return 'Documento';

    default:
      return 'Documento';
  }
}

/**
 * Obtiene el tipo de asociación entre dos nodos.
 * @param source - Tipo del nodo origen
 * @param target - Tipo del nodo destino
 * @returns El tipo de asociación
 */
export function getAssocByType(source: string, target: string): string {
  if (source === target) {
    const area = source.split(':')[0];
    return `${area}:association`;
  }
  return 'assa:association';
}
