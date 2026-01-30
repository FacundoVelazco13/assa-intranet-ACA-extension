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

import { LoginComponent } from '@alfresco/adf-core';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AppSettingsService } from '@alfresco/aca-shared';

@Component({
  imports: [LoginComponent],
  templateUrl: './app-login.component.html',
  styles: [
    `
      .adf-login {
        background-color: var(--theme-white-background);
      }
      .adf-login .adf-login-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: fit-content;
        max-width: 100%;
        min-width: 0;
      }

      .adf-login .mat-mdc-card-header.adf-login-card-header-text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0;
        box-sizing: border-box;
      }
      .adf-login .mat-mdc-card-header-text {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
      }
      .adf-login .mat-mdc-card-title {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
      }
      .adf-login .adf-alfresco-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0;
      }
      .adf-login .adf-img-logo {
        display: block;
        margin: 0 auto;
        max-width: 220px;
        width: 100%;
        height: auto;
        padding: 0;
      }
      .adf-login .adf-login-logo img {
        display: block;
        margin: 0 auto;
        max-width: 220px;
        width: 100%;
        height: auto;
        padding: 0;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppLoginComponent {
  settings = inject(AppSettingsService);
}
