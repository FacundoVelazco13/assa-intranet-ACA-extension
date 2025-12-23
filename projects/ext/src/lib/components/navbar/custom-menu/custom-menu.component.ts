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
      icon: '',
      title: 'Organización y Métodos',
      children: [
        {
          id: 'Dashboard',
          title: 'Dashboard',
          route: 'intranet/oym',
          url: 'intranet/oym',
          icon: ''
        },
        {
          id: 'Procedimientos',
          title: 'Procedimientos',
          route: 'intranet/oym/procedimientos',
          url: 'intranet/oym/procedimientos',
          icon: ''
        },
        {
          id: 'Politicas',
          title: 'Políticas',
          route: 'intranet/oym/politicas',
          url: 'intranet/oym/politicas',
          icon: ''
        },
        {
          id: 'Formularios',
          title: 'Formularios',
          route: 'intranet/oym/formularios',
          url: 'intranet/oym/formularios',
          icon: ''
        }
      ],
      route: 'intranet/oym'
    });

    return {
      id: 'documents-menu',
      icon: '',
      title: 'Documentos',
      children: mappedChildren,
      route: '/'
    };
  }
}
