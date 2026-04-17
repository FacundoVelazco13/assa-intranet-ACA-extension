import { AlfrescoApiService } from '@alfresco/adf-content-services';
import { AppConfigService, AuthenticationService } from '@alfresco/adf-core';
import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AdfHttpClient } from '@alfresco/adf-core/api';
import { RequestOptions } from '@alfresco/js-api';

@Injectable()
export class BaseItopService {
  protected apiService = inject(AlfrescoApiService);
  protected appConfigService = inject(AppConfigService);
  protected authenticationService = inject(AuthenticationService);

  protected defaultParams: RequestOptions = {
    path: '',
    httpMethod: '',
    contentTypes: ['application/json'],
    accepts: ['application/json']
  };

  constructor(protected adfHttpClient: AdfHttpClient) {}

  getBasePath(appName: string): string {
    return appName ? `${this.contextRoot}/${appName}` : this.contextRoot;
  }

  protected post<T, R>(url: string, data?: T, queryParams?: any): Observable<R> {
    return from(
      this.callApi<R>(url, {
        ...this.defaultParams,
        path: url,
        httpMethod: 'POST',
        bodyParam: data,
        queryParams
      })
    );
  }

  protected put<T, R>(url: string, data?: T): Observable<R> {
    return from(
      this.callApi<R>(url, {
        ...this.defaultParams,
        path: url,
        httpMethod: 'PUT',
        bodyParam: data
      })
    );
  }

  protected delete(url: string): Observable<void> {
    return from(
      this.callApi<void>(url, {
        ...this.defaultParams,
        path: url,
        httpMethod: 'DELETE'
      })
    );
  }

  protected get<T>(url: string, queryParams?: any): Observable<T> {
    return from(
      this.callApi<T>(url, {
        ...this.defaultParams,
        path: url,
        httpMethod: 'GET',
        queryParams
      })
    );
  }

  protected callApi<T>(url: string, params: RequestOptions): Promise<T> {
    if (this.isOopExtensionUrl(url)) {
      const ticket = this.getAuthenticationTicket();
      if (ticket) {
        params.headerParams = {
          ...params.headerParams,
          Authorization: `Bearer ${ticket}`
        };
      }
    }

    return this.adfHttpClient.request(url, params);
  }

  private isOopExtensionUrl(url: string): boolean {
    return url.startsWith('/alfresco-oop') || url.includes('/alfresco-oop') || url.startsWith('alfresco-oop');
  }

  private getAuthenticationTicket(): string | null {
    try {
      const ticket = this.authenticationService.getToken();

      if (ticket && ticket.trim() !== '') {
        return ticket;
      }

      console.warn('No authentication ticket found');
      return null;
    } catch (error) {
      console.warn('Failed to get authentication ticket:', error);
      return null;
    }
  }

  protected get contextRoot() {
    return this.appConfigService.get('ecmHost', '');
  }
}
