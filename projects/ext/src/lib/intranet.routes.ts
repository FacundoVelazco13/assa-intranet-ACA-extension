import { Route } from '@angular/router';
import { HomeDashboardComponent } from './components/dashboard/home/home-dashboard.component';
import { GiDashboardComponent } from './components/dashboard/gi/gi-dashboard.component';
import { OymDashboardComponent } from './components/dashboard/oym/oym-dashboard.component';
import { IntranetPageComponent } from './components/intranet-page/intranet-page.component';
import { DossierViewComponent } from './components/document-views/dossier-view/dossier-view.component';
import { RecordViewComponent } from './components/document-views/record-view/record-view.component';
import { IntranetSearchResultComponent } from './components/Intranet-search/intranet-search-result/intranet-search-result.component';
import { PeopleListComponent } from './components/Services/people/people-list.component';

export const INTRANET_LAYOUT_ROUTES: Route[] = [
  {
    path: 'intranet',
    children: [
      {
        path: '',
        component: HomeDashboardComponent
      },
      {
        path: 'dashboard',
        component: HomeDashboardComponent
      },
      {
        path: 'gi',
        children: [
          {
            path: '',
            component: GiDashboardComponent
          },
          {
            path: 'notas',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Notas',
              sitePath: 'Sites/GI/documentLibrary/Notas'
            }
          },
          {
            path: 'notas/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'gi/notas'
            }
          },
          {
            path: 'notas/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'gi/notas'
            }
          },
          {
            path: 'respuestas',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Respuestas a notas',
              sitePath: 'Sites/GI/documentLibrary/Respuestas'
            }
          },
          {
            path: 'respuestas/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'gi/respuestas'
            }
          },
          {
            path: 'respuestas/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'gi/respuestas'
            }
          },
          {
            path: 'expedientes',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Expedientes',
              sitePath: 'Sites/GI/documentLibrary/Expedientes'
            }
          },
          {
            path: 'expedientes/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'gi/expedientes'
            }
          },
          {
            path: 'expedientes/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'gi/expedientes'
            }
          }
        ]
      },
      {
        path: 'oym',
        children: [
          {
            path: '',
            component: OymDashboardComponent
          },
          {
            path: 'procedimientos',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Procedimientos',
              sitePath: 'Sites/OYM/documentLibrary/Procedimientos'
            }
          },
          {
            path: 'procedimientos/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'oym/procedimientos'
            }
          },
          {
            path: 'procedimientos/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'oym/procedimientos'
            }
          },
          {
            path: 'politicas',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Políticas',
              sitePath: 'Sites/OYM/documentLibrary/politicas'
            }
          },
          {
            path: 'politicas/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'oym/politicas'
            }
          },
          {
            path: 'politicas/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'oym/politicas'
            }
          },
          {
            path: 'formularios',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Formularios',
              sitePath: 'Sites/OYM/documentLibrary/Formularios'
            }
          },
          {
            path: 'formularios/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'oym/formularios'
            }
          },
          {
            path: 'formularios/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'oym/formularios'
            }
          }
        ]
      },
      {
        path: 'hys',
        children: [
          {
            path: '',
            component: IntranetPageComponent
          },
          {
            path: 'normas',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Normas',
              sitePath: 'Sites/hys/documentLibrary/Normas'
            }
          },
          {
            path: 'normas/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'hys/normas'
            }
          },
          {
            path: 'normas/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'hys/normas'
            }
          },
          {
            path: 'procedimientos',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Procedimientos',
              sitePath: 'Sites/hys/documentLibrary/Procedimientos'
            }
          },
          {
            path: 'procedimientos/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'hys/procedimientos'
            }
          },
          {
            path: 'procedimientos/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'hys/procedimientos'
            }
          },
          {
            path: 'instructivos',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Instructivos',
              sitePath: 'Sites/hys/documentLibrary/Instructivos'
            }
          },
          {
            path: 'instructivos/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'hys/instructivos'
            }
          },
          {
            path: 'instructivos/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'hys/instructivos'
            }
          },
          {
            path: 'fichas',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Fichas de riesgo local',
              sitePath: 'Sites/hys/documentLibrary/Fichas'
            }
          },
          {
            path: 'fichas/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'hys/fichas'
            }
          },
          {
            path: 'fichas/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'hys/fichas'
            }
          }
        ]
      },
      {
        path: 'pc',
        children: [
          {
            path: '',
            component: IntranetPageComponent
          },
          {
            path: 'micromedicion',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Micromedición',
              sitePath: 'Sites/pc/documentLibrary/Micromedicion'
            }
          },
          {
            path: 'micromedicion/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'pc/micromedicion'
            }
          },
          {
            path: 'micromedicion/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'pc/micromedicion'
            }
          },
          {
            path: 'info',
            component: IntranetPageComponent,
            data: {
              root: '-root-',
              title: 'Info Políticas comerciales',
              sitePath: 'Sites/pc/documentLibrary/Info'
            }
          },
          {
            path: 'info/details/:nodeId',
            component: DossierViewComponent,
            data: {
              navigateSource: 'pc/info'
            }
          },
          {
            path: 'info/record/:nodeId',
            component: RecordViewComponent,
            data: {
              navigateSource: 'pc/info'
            }
          }
        ]
      },
      {
        path: 'services',
        component: PeopleListComponent
      },
      {
        path: 'search',
        component: IntranetSearchResultComponent
      }
    ]
  }
];
