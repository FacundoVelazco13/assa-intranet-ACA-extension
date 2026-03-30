import { AdfHttpClient } from '@alfresco/adf-core/api';
import { Injectable } from '@angular/core';
import { ItopApiResponse, ItopDataResponse, ItopPerson, ItopPersonObject } from '../../models/itop-types';
import { BaseItopService } from './base-itop.service';
import { AlfrescoApiService } from '@alfresco/adf-content-services';
import { AppConfigService } from '@alfresco/adf-core';
import { firstValueFrom } from 'rxjs';

const principal_url = '/alfresco/s/itop/data';
const mock_url = '/alfresco/s/itop/mock';

@Injectable({
  providedIn: 'root'
})
export class ItopService extends BaseItopService {
  constructor(
    protected adfHttpClient: AdfHttpClient,
    protected apiService: AlfrescoApiService,
    protected appConfig: AppConfigService
  ) {
    super(adfHttpClient);
  }

  async getItopPeople(): Promise<ItopPerson[]> {
    const people: ItopPerson[] = [];
    let response: ItopApiResponse;

    try {
      response = await firstValueFrom(this.get(principal_url));
    } catch (error) {
      try {
        response = await firstValueFrom(this.get(mock_url));
      } catch (mockError) {
        console.error('Error fetching data from both primary and mock endpoints:', error, mockError);
        throw new Error('Failed to fetch data from both primary and mock endpoints.');
      }
    }

    const { success, statusCode, operation, class: itop_class, key, data } = response as ItopApiResponse;

    if (!success) {
      throw new Error(`API responded with error: ${statusCode} - ${operation} on ${itop_class} (${key})`);
    }

    const { code, message, objects } = data as ItopDataResponse;

    if (!objects) {
      throw new Error(`API response missing 'objects', code: ${code}, message: ${message}`);
    }

    Object.values(objects).map((person_objects: ItopPersonObject) => {
      const { fields } = person_objects;

      if (fields) {
        people.push(fields);
      }
    });

    return people;
  }
}
