/* eslint-disable license-header/header */
import { EnvironmentProviders, NgModule, Provider } from '@angular/core';
import { provideFolderRulesExtension } from '@alfresco/aca-content/folder-rules';
import { provideAosExtension } from '@alfresco/aca-content/ms-office';
import { DEV_MODE_TOKEN, PACKAGE_JSON, provideAboutExtension } from '@alfresco/aca-content/about';
import { environment } from '../environments/environment';
import { provideExtExtension } from '@alfresco/ext';
import { provideCollaboraExtension } from '@alfresco/collabora-extension';

import packageJson from 'package.json';

export function provideApplicationExtensions(): (Provider | EnvironmentProviders)[] {
  return [
    ...provideAboutExtension(),
    ...provideAosExtension(),
    ...provideFolderRulesExtension(),
    { provide: PACKAGE_JSON, useValue: packageJson },
    { provide: DEV_MODE_TOKEN, useValue: !environment.production },
    ...provideExtExtension(),
    ...provideCollaboraExtension()
  ];
}

/* @deprecated use `provideApplicationExtensions()` provider api instead */
@NgModule({
  providers: [...provideApplicationExtensions()]
})
export class AppExtensionsModule {}
