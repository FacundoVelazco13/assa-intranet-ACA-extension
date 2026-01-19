/* eslint-disable license-header/header */
import { provideTranslations } from '@alfresco/adf-core';
import { provideExtensionConfig, provideExtensions } from '@alfresco/adf-extensions';
import { EnvironmentProviders, Provider } from '@angular/core';
import { collaboraExtensionComponent } from './collabora-extension/collabora-extension.component';

export function provideCollaboraExtension(): (Provider | EnvironmentProviders)[] {
  return [
    provideTranslations('collabora-extension', 'assets/collabora-extension'),
    provideExtensionConfig(['collabora-extension.json']),
    provideExtensions({
      components: {
        'collabora-extension.main.component': collaboraExtensionComponent
      }
    })
  ];
}
