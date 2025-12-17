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

/*
 * Public API Surface of aca-content
 */

export * from './lib/aca-content.module';
export * from './lib/aca-content.routes';
export * from './lib/store/initial-state';
export * from './lib/services/content-url.service';
export * from './lib/services/content-management.service';
export * from './lib/services/node-actions.service';
export * from './lib/components/info-drawer/comments-tab/external-node-permission-comments-tab.service';
export * from './lib/components/info-drawer/comments-tab/comments-tab.component';
export * from './lib/components/info-drawer/metadata-tab/metadata-tab.component';
export * from './lib/components/sidenav/directives/active-link.directive';
export * from './lib/components/sidenav/directives/action.directive';
export * from './lib/components/sidenav/components/expand-menu.component';
export * from './lib/directives/document-list.directive';
export * from './lib/utils/aca-search-utils';
export * from './lib/pipes/is-feature-supported.pipe';

export { SearchInputComponent } from './lib/components/search/search-input/search-input.component';
export { SearchActionMenuComponent } from './lib/components/search/search-action-menu/search-action-menu.component';
export { SaveSearchDirective } from './lib/components/search/search-save/directive/save-search.directive';
export { SavedSearchesContextService } from './lib/services/saved-searches-context.service';
export { DocumentListDirective } from './lib/directives/document-list.directive';
export { ThumbnailColumnComponent } from './lib/components/dl-custom-components/thumbnail-column/thumbnail-column.component';
export { BulkActionsDropdownComponent } from './lib/components/bulk-actions-dropdown/bulk-actions-dropdown.component';
export { SearchAiInputContainerComponent } from './lib/components/knowledge-retrieval/search-ai/search-ai-input-container/search-ai-input-container.component';

export { SearchNavigationService } from './lib/components/search/search-navigation.service';
export { SearchInputControlComponent } from './lib/components/search/search-input-control/search-input-control.component';
export { SearchLibrariesQueryBuilderService } from './lib/components/search/search-libraries-results/search-libraries-query-builder.service';

export { DatatableCellBadgesComponent } from './lib/components/dl-custom-components/datatable-cell-badges/datatable-cell-badges.component';
export { LocationLinkComponent } from './lib/components/common/location-link/location-link.component';
