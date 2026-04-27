import { provideTranslations } from '@alfresco/adf-core';
import { provideExtensionConfig, provideExtensions } from '@alfresco/adf-extensions';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { DocsDashboardComponent } from './components/navbar/docs-section/docs/docs-dashboard.component';
import { CustomMenuComponent } from './components/navbar/custom-menu/custom-menu.component';
import { HomeNavbarComponent } from './components/navbar/home-navbar/home-navbar.component';
import { PersonalNavbarComponent } from './components/navbar/personal-navbar/personal-navbar.component';
import { AdminSectionsNavbarComponent } from './components/navbar/admin-sections-navbar/admin-sections-navbar.component';
import { ServicesNavbarComponent } from './components/navbar/services-navbar/services-navbar.component';
import { HomeDashboardComponent } from './components/dashboard/home/home-dashboard.component';
import { OymDashboardComponent } from './components/dashboard/oym/oym-dashboard.component';
import { DossierViewComponent } from './components/document-views/dossier-view/dossier-view.component';
import { RecordViewComponent } from './components/document-views/record-view/record-view.component';
import { AssociationEffects } from './store/effects/association.effects';
import { DossierEffects } from './store/effects/dossier.effects';
import { FilesEffects } from './store/effects/files.effects';
import { RecordEffects } from './store/effects/record.effects';
import * as rules from './rules/ext.rules';
import { IntranetPageComponent } from './components/intranet-page/intranet-page.component';
import { SearchEffects } from './store/effects';
import { IntranetSearchResultComponent } from './components/Intranet-search/intranet-search-result/intranet-search-result.component';
import { IntranetSearchResultsRowComponent } from './components/Intranet-search/intranet-search-results-row/intranet-search-results-row.component';
import { IntranetRouterEffects } from './store/effects/intranet-router.effects';
import { GiDashboardComponent } from './components/dashboard/gi/gi-dashboard.component';
import { HysDashboardComponent } from './components/dashboard/hys/hys-dashboard.component';
import { PcDashboardComponent } from './components/dashboard/pc/pc-dashboard.component';
import { ServicesRedirectComponent } from './components/dashboard/services-home/services-redirect.component';
import { PeopleListComponent } from './components/Services/people/people-list.component';
import { BirthdayCalendarComponent } from './components/Services/birthday-calendar/birthday-calendar.component';

export function provideExtExtension(): (Provider | EnvironmentProviders)[] {
  return [
    provideTranslations('ext', 'assets/ext'),
    provideExtensionConfig(['ext.json']),
    provideEffects([AssociationEffects, DossierEffects, FilesEffects, SearchEffects, IntranetRouterEffects, RecordEffects]),
    provideExtensions({
      components: {
        'home-dashboard.component': HomeDashboardComponent,
        'custom-menu.component': CustomMenuComponent,
        'home-navbar.component': HomeNavbarComponent,
        'personal-navbar.component': PersonalNavbarComponent,
        'admin-sections-navbar.component': AdminSectionsNavbarComponent,
        'services-navbar.component': ServicesNavbarComponent,
        'docs-dashboard.component': DocsDashboardComponent,
        'oym-dashboard.component': OymDashboardComponent,
        'dossier-view.component': DossierViewComponent,
        'record-view.component': RecordViewComponent,
        'intranet-page.component': IntranetPageComponent,
        'intranet-search-result.component': IntranetSearchResultComponent,
        'intranet-search-results-row.component': IntranetSearchResultsRowComponent,
        'gi-dashboard.component': GiDashboardComponent,
        'hys-dashboard.component': HysDashboardComponent,
        'pc-dashboard.component': PcDashboardComponent,
        'services-redirect.component': ServicesRedirectComponent,
        'people-list.component': PeopleListComponent,
        'birthday-calendar.component': BirthdayCalendarComponent
      },
      evaluators: {
        'ext.isDossier': rules.isDossier,
        'ext.canCreateInCurrentFolder': rules.canCreateInCurrentFolder,
        'ext.isIntranetDocumentLibrary': rules.isIntranetDocumentLibrary,
        'ext.isIntranet': rules.isIntranet,
        'ext.isIntranetSearch': rules.isIntranetSearch,
        'ext.isRecordCreationContext': rules.isRecordCreationContext,
        'ext.debugContext': rules.debugContext
      }
    })
  ];
}
