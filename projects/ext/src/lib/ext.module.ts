/* eslint-disable license-header/header */
import { provideTranslations } from '@alfresco/adf-core';
import { provideExtensionConfig, provideExtensions } from '@alfresco/adf-extensions';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { DocsDashboardComponent } from './components/navbar/docs-section/docs/docs-dashboard.component';
import { CustomMenuComponent } from './components/navbar/custom-menu/custom-menu.component';
import { HomeDashboardComponent } from './components/dashboard/home/home-dashboard.component';
import { OymDashboardComponent } from './components/dashboard/oym/oym-dashboard.component';
import { DossierViewComponent } from './components/document-views/dossier-view/dossier-view.component';
import { AssociationEffects } from './store/effects/association.effects';
import { DossierEffects } from './store/effects/dossier.effects';
import { FilesEffects } from './store/effects/files.effects';
import * as rules from './rules/ext.rules';
import { IntranetPageComponentComponent } from './components/intranet-page/intranet-page.component.component';
import { SearchEffects } from './store/effects';
import { IntranetSearchResultComponent } from './components/Intranet-search/intranet-search-result/intranet-search-result.component';
import { IntranetSearchResultsRowComponent } from './components/Intranet-search/intranet-search-results-row/intranet-search-results-row.component';
import { IntranetRouterEffects } from './store/effects/intranet-router.effects';
import { GiDashboardComponent } from './components/dashboard/gi/gi-dashboard.component';
import { ServicesRedirectComponent } from './components/dashboard/services-home/services-redirect.component';

export function provideExtExtension(): (Provider | EnvironmentProviders)[] {
  return [
    provideTranslations('ext', 'assets/ext'),
    provideExtensionConfig(['ext.json']),
    provideEffects([AssociationEffects, DossierEffects, FilesEffects, SearchEffects, IntranetRouterEffects]),
    provideExtensions({
      components: {
        'home-dashboard.component': HomeDashboardComponent,
        'custom-menu.component': CustomMenuComponent,
        'docs-dashboard.component': DocsDashboardComponent,
        'oym-dashboard.component': OymDashboardComponent,
        'dossier-view.component': DossierViewComponent,
        'intranet-page.component': IntranetPageComponentComponent,
        'intranet-search-result.component': IntranetSearchResultComponent,
        'intranet-search-results-row.component': IntranetSearchResultsRowComponent,
        'gi-dashboard.component': GiDashboardComponent,
        'services-redirect.component': ServicesRedirectComponent
      },
      evaluators: {
        'ext.isDossier': rules.isDossier,
        'ext.canCreateInCurrentFolder': rules.canCreateInCurrentFolder,
        'ext.isIntranetDocumentLibrary': rules.isIntranetDocumentLibrary,
        'ext.isIntranet': rules.isIntranet,
        'ext.isIntranetSearch': rules.isIntranetSearch,
        'ext.debugContext': rules.debugContext
      }
    })
  ];
}
