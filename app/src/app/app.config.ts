/*!
 * Copyright © 2005-2025 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Alfresco Example Content Application
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail. Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * from Hyland Software. If not, see <http://www.gnu.org/licenses/>.
 */

import { importProvidersFrom, ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideNoopAnimations, provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard, provideAppConfig, provideCoreAuth, provideI18N } from '@alfresco/adf-core';
import { AppService, provideContentAppExtensions } from '@alfresco/aca-shared';
import { provideApplicationExtensions } from './extensions.module';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideRouter, withHashLocation } from '@angular/router';
import { CONTENT_LAYOUT_ROUTES, ContentServiceExtensionModule } from '@alfresco/aca-content';
import { SHELL_APP_SERVICE, SHELL_AUTH_TOKEN, provideShellRoutes } from '@alfresco/adf-core/shell';
import { APP_ROUTES } from './app.routes';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

registerLocaleData(localeEs);

export const AppConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideCoreAuth({ useHash: true }),
    provideAppConfig(),
    importProvidersFrom(ContentServiceExtensionModule),
    provideI18N({
      assets: [['app', 'assets']]
    }),
    provideContentAppExtensions(),
    provideApplicationExtensions(),
    provideRouter(APP_ROUTES, withHashLocation()),
    environment.e2e ? provideNoopAnimations() : provideAnimations(),
    provideShellRoutes(CONTENT_LAYOUT_ROUTES),
    {
      provide: SHELL_APP_SERVICE,
      useClass: AppService
    },
    {
      provide: SHELL_AUTH_TOKEN,
      useValue: AuthGuard
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 10000
      }
    }
  ]
};
