/* eslint-disable license-header/header */
import { PropertyConfig } from '../components/document-views/dossier-info/dossier-info.component';
import { OymNodeType, HysNodeType, PcNodeType, GiNodeType } from '../models/node-types.enum';

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
 * Retorna las propiedades específicas según el tipo de nodo.
 * Las propiedades incluyen aspectos y metadatos custom de cada área.
 */
export function getPropertiesByType(nodeType: string): PropertyConfig[] {
  switch (nodeType) {
    // OYM types con vigencia
    case OymNodeType.Procedimiento:
    case OymNodeType.Politica:
      return [
        {
          key: 'assa:esVigente',
          label: 'Vigencia',
          icon: 'event_available',
          defaultValue: '-',
          formatter: (value) => (value ? 'Vigente' : 'No vigente')
        }
      ];
    case OymNodeType.Formulario:
      return [];

    // HYS types con vigencia
    case HysNodeType.Normas:
    case HysNodeType.Procedimientos:
      return [
        {
          key: 'assa:esVigente',
          label: 'Vigencia',
          icon: 'event_available',
          defaultValue: '-',
          formatter: (value) => (value ? 'Vigente' : 'No vigente')
        }
      ];
    case HysNodeType.Instructivos:
      return [];

    // PC types
    case PcNodeType.Micromedicion:
    case PcNodeType.Info:
    case PcNodeType.Obra:
      return [];

    // GI types con propiedades específicas
    case GiNodeType.Expediente:
      return [
        {
          key: 'gi:numeroExp',
          label: 'Número de Expediente',
          icon: 'numbers',
          defaultValue: '-'
        }
      ];
    case GiNodeType.Nota:
      return [
        {
          key: 'gi:tipoDeNota',
          label: 'Tipo de Nota',
          icon: 'label',
          defaultValue: '-'
        },
        {
          key: 'gi:estado',
          label: 'Estado',
          icon: 'flag',
          defaultValue: '-'
        }
      ];
    case GiNodeType.Respuesta:
      return [];

    // default
    default:
      return [];
  }
}
