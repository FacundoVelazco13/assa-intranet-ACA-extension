/* eslint-disable license-header/header */
import { NodeAssociationPaging, NodeEntry, NodesApi, Node } from '@alfresco/js-api';
import { inject, Injectable } from '@angular/core';
import { ContentApiService } from '@alfresco/aca-shared';
import { NotificationService, PaginationModel } from '@alfresco/adf-core';
import { ContentService, NodeAction } from '@alfresco/adf-content-services';
import { Subject } from 'rxjs';
import { CustomNodeActionsService } from '../node-actions/custom-node-actions.service';

@Injectable({
  providedIn: 'root'
})
export class CustomContentApiService {
  nodesApi: NodesApi;

  private readonly contentService: ContentService = inject(ContentService);
  private readonly nodesCustomActionService: CustomNodeActionsService = inject(CustomNodeActionsService);
  private readonly notificationService: NotificationService = inject(NotificationService);

  // Subject para notificar cuando se crea una asociación
  associationCreated: Subject<{ sourceId: string; targetId: string; targetName: string }> = new Subject();

  constructor(private readonly contentApi: ContentApiService) {}

  selectNodesForAssociation(sourceNode: NodeEntry, focusedElementOnCloseSelector?: string) {
    if (!this.hasEntityUpdatePermission(sourceNode.entry)) {
      this.notificationService.showError('No tiene permisos para crear asociaciones en este nodo');
      return;
    }

    /* const destinationSelection = this.nodeActionsService.getContentNodeSelection(NodeAction.CHOOSE, [sourceNode], focusedElementOnCloseSelector); */
    const destinationSelection = this.nodesCustomActionService.getCustomContentNodeSelection(
      NodeAction.CHOOSE,
      [sourceNode],
      focusedElementOnCloseSelector
    );

    destinationSelection.subscribe({
      next: (selections: Node[]) => {
        if (!selections || selections.length === 0) {
          return;
        }

        const targetNode = selections[0];
        this.createAssociation(sourceNode.entry.id, targetNode.id)
          .then(() => {
            this.notificationService.showInfo(`Asociación creada con "${targetNode.name}"`);

            this.associationCreated.next({
              sourceId: sourceNode.entry.id,
              targetId: targetNode.id,
              targetName: targetNode.name
            });
          })
          .catch((error) => {
            console.error('Error creating association:', error);

            // Notificación de error
            let errorMessage = 'Error al crear la asociación';

            if (error?.message) {
              try {
                const errorData = JSON.parse(error.message);
                if (errorData?.error?.statusCode === 409) {
                  errorMessage = 'La asociación ya existe';
                } else if (errorData?.error?.statusCode === 403) {
                  errorMessage = 'No tiene permisos para crear esta asociación';
                } else if (errorData?.error?.statusCode === 422) {
                  errorMessage = 'El tipo de asociación no es válido para estos nodos';
                }
              } catch {
                // Error parsing, use generic message
              }
            }

            this.notificationService.showError(errorMessage);
          });
      },
      error: (error) => {
        console.error('Error in node selection:', error);
        this.notificationService.showError('Error al seleccionar el nodo');
      }
    });
  }
  private hasEntityUpdatePermission(entry: Node): boolean {
    return this.contentService.hasAllowableOperations(entry, 'update');
  }

  async createAssociation(sourceNodeId: string, targetNodeId: string, assocType?: string): Promise<void> {
    this.nodesApi = this.contentApi.nodesApi;
    await this.nodesApi.createAssociation(sourceNodeId, {
      targetId: targetNodeId,
      assocType: assocType || 'assa:general_assoc'
    });
  }

  async listTargetAssociations(nodeId: string): Promise<NodeAssociationPaging> {
    this.nodesApi = this.contentApi.nodesApi;
    return this.nodesApi.listTargetAssociations(nodeId, { include: ['association'] });
  }
  async listSourceAssociations(nodeId: string): Promise<NodeAssociationPaging> {
    this.nodesApi = this.contentApi.nodesApi;
    return this.nodesApi.listSourceAssociations(nodeId, { include: ['association'] });
  }
  async listBidirectionalAssociations(nodeId: string, pagination?: PaginationModel): Promise<NodeAssociationPaging> {
    this.nodesApi = this.contentApi.nodesApi;

    const [target, source] = await Promise.all([
      this.nodesApi.listTargetAssociations(nodeId, { include: ['association'] }),
      this.nodesApi.listSourceAssociations(nodeId, { include: ['association'] })
    ]);
    const all = [...(target.list?.entries || []), ...(source.list?.entries || [])];
    const skip = pagination?.skipCount || 0;
    const max = pagination?.maxItems || 25;
    const page = all.slice(skip, skip + max);

    return {
      list: {
        entries: page,
        pagination: {
          count: page.length,
          hasMoreItems: skip + max < all.length,
          totalItems: all.length,
          skipCount: skip,
          maxItems: max
        }
      }
    };
  }
  /**
   * Podría crear tambien un BidirectionalDeleteAssociation,
   * donde se eliminen ambas asociaciones entre un par de nodos.
   * De esta forma podría mostrar todas las asociaciones en una sola tabla.
   */
  async deleteAssociation(sourceNodeId: string, targetNodeId: string, assocType?: string): Promise<void> {
    this.nodesApi = this.contentApi.nodesApi;
    return this.nodesApi.deleteAssociation(sourceNodeId, targetNodeId, assocType ? { assocType } : undefined);
  }
}
