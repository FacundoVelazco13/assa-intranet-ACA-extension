import { AdfHttpClient } from '@alfresco/adf-core/api';
import { Injectable } from '@angular/core';
import { ItopApiResponse, ItopDataResponse, ItopPerson, ItopPersonObject } from '../../models/itop-types';
import { BaseItopService } from './base-itop.service';
import { AlfrescoApiService } from '@alfresco/adf-content-services';
import { firstValueFrom } from 'rxjs';

const DEFAULT_PEOPLE_ENDPOINT = '/alfresco/s/itop/data?class=Person';

@Injectable({
  providedIn: 'root'
})
export class ItopService extends BaseItopService {
  constructor(
    protected adfHttpClient: AdfHttpClient,
    protected apiService: AlfrescoApiService
  ) {
    super(adfHttpClient);
  }

  private get peopleEndpoint(): string {
    return this.appConfigService.get<string>('itop.peopleEndpoint', DEFAULT_PEOPLE_ENDPOINT);
  }

  async getItopPeople(): Promise<ItopPerson[]> {
    const people: ItopPerson[] = [];
    const response = (await firstValueFrom(this.get(this.peopleEndpoint))) as ItopApiResponse;

    const { success, statusCode, operation, class: itop_class, key, data } = response;

    if (!success) {
      throw new Error(`API responded with error: ${statusCode} - ${operation} on ${itop_class} (${key})`);
    }

    const { code, message, objects } = data as ItopDataResponse;

    if (!objects) {
      throw new Error(`API response missing 'objects', code: ${code}, message: ${message}`);
    }

    Object.values(objects).forEach((person_objects: ItopPersonObject) => {
      const { fields } = person_objects;

      if (fields) {
        people.push(fields);
      }
    });

    return people;
  }
}
