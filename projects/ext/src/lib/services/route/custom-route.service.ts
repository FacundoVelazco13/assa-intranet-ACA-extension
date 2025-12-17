/* eslint-disable license-header/header */
import { Injectable } from '@angular/core';
import { Node } from '@alfresco/js-api';
import { OymNodeType, AlfrescoNodeType } from '../../models';
@Injectable({
  providedIn: 'root'
})
export class CustomRouteService {
  getNavigationRouteForNode(node: Node): string[] {
    const nodeType = node.nodeType;
    switch (nodeType) {
      case OymNodeType.Procedimiento:
        return ['intranet', 'oym', 'procedimientos', 'details', node.id];
      case OymNodeType.Politica:
        return ['intranet', 'oym', 'politicas', 'details', node.id];
      case OymNodeType.FormularioRegistro:
        return ['intranet', 'oym', 'formularios', 'details', node.id];
      case AlfrescoNodeType.Folder:
        return ['personal-files', node.id];
      default:
        return ['nodes', node.id];
    }
  }
}
