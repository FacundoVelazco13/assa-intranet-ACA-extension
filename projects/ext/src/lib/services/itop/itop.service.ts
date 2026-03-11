import { AdfHttpClient, RequestOptions } from '@alfresco/adf-core/api';
import { Injectable, inject } from '@angular/core';
import { ItopApiResponse, ItopDataResponse, ItopPerson, ItopPersonObject } from '../../models/itop-types';

const principal_url = 'alfresco/s/api/itop/data';
const mock_url = 'alfresco/s/api/itop/mock';

const opts: RequestOptions = {
  httpMethod: 'GET',
  contentTypes: ['application/json'],
  accepts: ['application/json']
};

@Injectable({
  providedIn: 'root'
})
export class ItopService {
  private readonly adfHttpClient = inject(AdfHttpClient);

  async getItopPeople(): Promise<ItopPerson[]> {
    const people: ItopPerson[] = [];

    let response: ItopApiResponse;

    try {
      response = await this.adfHttpClient.request(principal_url, opts);
    } catch (error) {
      try {
        response = await this.adfHttpClient.request(mock_url, opts);
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
