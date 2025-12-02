/* eslint-disable license-header/header */
import { Node } from '@alfresco/js-api';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodesApiService } from '@alfresco/adf-content-services';

@Injectable({
  providedIn: 'root'
})
export class CustomNodeApiService {
  private readonly nodesApi: NodesApiService = inject(NodesApiService);

  constructor() {}

  createDossier(parentId: string, dossierData: { name: string; title?: string; description?: string }): Observable<Node> {
    return this.nodesApi.createFolder(parentId, {
      name: dossierData.name,
      properties: {
        'cm:title': dossierData.title,
        'cm:description': dossierData.description
      },
      nodeType: 'cm:folder'
    });
  }
}
