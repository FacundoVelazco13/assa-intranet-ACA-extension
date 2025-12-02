/* eslint-disable license-header/header */
import { NavBarLinkRef } from '@alfresco/adf-extensions';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '@alfresco/aca-shared';
import { MetaExpandMenuComponent } from '../meta-expand-menu/meta-expand-menu.component';

@Component({
  selector: 'aca-custom-menu',
  imports: [MetaExpandMenuComponent],
  templateUrl: './custom-menu.component.html',
  styleUrl: './custom-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomMenuComponent implements OnInit {
  appService = inject(AppService);
  item: NavBarLinkRef;
  ngOnInit() {
    this.item = this.createNavBarLinkRef();
  }

  onActionClick(el: NavBarLinkRef): void {
    this.appService.appNavNarMode$.next('collapsed');
    // eslint-disable-next-line no-console
    console.log('click en custom menu ', el);
  }

  private createNavBarLinkRef(): NavBarLinkRef {
    const mappedChildren: NavBarLinkRef[] = [];

    mappedChildren.push({
      id: 'organizacion-y-metodos',
      icon: 'account_tree',
      title: 'Organización y Métodos',
      children: [
        {
          id: 'Dashboard',
          icon: 'home',
          title: 'Dashboard',
          route: 'intranet/oym',
          url: 'intranet/oym'
        },
        {
          id: 'Procedimientos',
          icon: 'schema',
          title: 'Procedimientos',
          route: 'intranet/oym/procedimientos',
          url: 'intranet/oym/procedimientos'
        },
        {
          id: 'Politicas',
          icon: 'gavel',
          title: 'Políticas',
          route: 'intranet/oym/politicas',
          url: 'intranet/oym/politicas'
        },
        {
          id: 'Formularios',
          icon: 'assignment',
          title: 'Formularios',
          route: 'intranet/oym/formularios',
          url: 'intranet/oym/formularios'
        }
      ],
      route: 'intranet/oym'
    });
    /* mappedChildren.push({
      id: 'mesa-de-entrada',
      icon: 'inbox-arrow-down-outline',
      title: 'Mesa de entrada',
      children: [
        {
          id: 'Notas',
          icon: 'note-text-outline',
          title: 'Notas',
          route: '/oym'
        },
        {
          id: 'otras notas',
          icon: 'note-multiple-outline',
          title: 'Otras Notas',
          route: '/oym'
        },
        {
          id: 'mas notas',
          icon: 'note-plus-outline',
          title: 'Mas Notas',
          route: '/oym'
        }
      ],
      route: '/oym'
    }); */
    /* mappedChildren.push({
      id: 'higiene-y-seguridad',
      icon: 'security',
      title: 'Higiene y Seguridad',
      children: [
        {
          id: 'fichas-de-seguridad',
          icon: 'receipt',
          title: 'Fichas de Seguridad',
          route: '/oym'
        },
        {
          id: 'Otra cosa',
          icon: 'masks',
          title: 'Otras Fichas de Seguridad',
          route: '/oym'
        }
      ],
      route: '/oym'
    }); */

    return {
      id: 'documents-menu',
      icon: '',
      title: 'Documentos',
      children: mappedChildren,
      route: '/'
    };
  }
}
