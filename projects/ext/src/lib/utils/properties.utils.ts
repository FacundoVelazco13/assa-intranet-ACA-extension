/* eslint-disable license-header/header */
import { PropertyConfig } from '../components/document-views/dossier-info/dossier-info.component';
import { OymNodeType } from '../models/node-types.enum';

export function getStandardProperties(): PropertyConfig[] {
  return [
    { key: 'createdByUser.displayName', label: 'Creador', icon: 'person', defaultValue: '-', isNodeProperty: true },
    {
      key: 'createdAt',
      label: 'Fecha de creación',
      icon: 'calendar_today',
      defaultValue: '-',
      formatter: (value) =>
        new Date(value).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
      isNodeProperty: true
    },
    { key: 'modifiedByUser.displayName', label: 'Modificador', icon: 'person_outline', defaultValue: '-', isNodeProperty: true },
    {
      key: 'modifiedAt',
      label: 'Fecha de modificación',
      icon: 'event',
      defaultValue: '-',
      formatter: (value) =>
        new Date(value).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
      isNodeProperty: true
    }
  ];
}
/**
 * Actualmente no tengo muchas propiedades definidas, dejo las estandar.
 */
export function getPropertiesByType(nodeType: string): PropertyConfig[] {
  switch (nodeType) {
    case OymNodeType.Procedimiento:
      return [
        { key: 'oym:numeroProcedimiento', label: 'N° de Procedimiento', icon: 'confirmation_number', defaultValue: '-' },
        {
          key: 'oym:esVigente',
          label: 'Vigencia',
          icon: 'event_available',
          defaultValue: '-',
          formatter: (value) => (value ? 'Vigente' : 'No vigente')
        }
      ];
    case OymNodeType.Politica:
      return [];
    case OymNodeType.FormularioRegistro:
      return [];
    // default
    default:
      return [];
  }
}
