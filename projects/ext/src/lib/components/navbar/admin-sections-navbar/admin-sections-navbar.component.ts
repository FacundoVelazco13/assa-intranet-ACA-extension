import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from '@alfresco/aca-shared';

interface NavSubItem {
  id: string;
  title: string;
  route: string;
}

interface NavSectionGroup {
  id: string;
  title: string;
  homeRoute: string;
  isOpen: boolean;
  items: NavSubItem[];
}

@Component({
  selector: 'aca-admin-sections-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sections-navbar.component.html',
  styleUrl: './admin-sections-navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminSectionsNavbarComponent {
  private appService = inject(AppService);
  private router = inject(Router);

  title = 'Documentos Corporativos';
  mainDropdownOpen = false;

  sections: NavSectionGroup[] = [
    {
      id: 'intranet.navbar.oym',
      title: 'Organización y Métodos',
      homeRoute: 'intranet/oym',
      isOpen: false,
      items: [
        { id: 'oym-procedimientos', title: 'Procedimientos', route: 'intranet/oym/procedimientos' },
        { id: 'oym-politicas', title: 'Políticas', route: 'intranet/oym/politicas' },
        { id: 'oym-formularios', title: 'Formularios', route: 'intranet/oym/formularios' }
      ]
    },
    {
      id: 'intranet.navbar.gestion',
      title: 'Gestión Institucional',
      homeRoute: 'intranet/gi',
      isOpen: false,
      items: [
        { id: 'gi-notas', title: 'Notas', route: 'intranet/gi/notas' },
        { id: 'gi-respuestas', title: 'Respuestas a notas', route: 'intranet/gi/respuestas' },
        { id: 'gi-expedientes', title: 'Expedientes', route: 'intranet/gi/expedientes' }
      ]
    },
    {
      id: 'intranet.navbar.higiene',
      title: 'Higiene y Seguridad',
      homeRoute: 'intranet/hys',
      isOpen: false,
      items: [
        { id: 'hys-normas', title: 'Normas', route: 'intranet/hys/normas' },
        { id: 'hys-procedimientos', title: 'Procedimientos', route: 'intranet/hys/procedimientos' },
        { id: 'hys-instructivos', title: 'Instructivos', route: 'intranet/hys/instructivos' },
        { id: 'hys-fichas', title: 'Fichas de riesgo local', route: 'intranet/hys/fichas' }
      ]
    },
    {
      id: 'intranet.navbar.comercial',
      title: 'Políticas Comerciales',
      homeRoute: 'intranet/pc',
      isOpen: false,
      items: [
        { id: 'pc-micromedicion', title: 'Micromedición', route: 'intranet/pc/micromedicion' },
        { id: 'pc-info', title: 'Info Políticas comerciales', route: 'intranet/pc/info' }
      ]
    }
  ];

  toggleMainDropdown(): void {
    this.mainDropdownOpen = !this.mainDropdownOpen;
  }

  toggleSection(section: NavSectionGroup): void {
    // Si se abre la sección, navega a la ruta de inicio
    if (!section.isOpen) {
      this.router.navigate([section.homeRoute]);
    }

    // Cerrar todas las otras secciones - exclusión mutua
    this.sections.forEach((s) => {
      if (s.id !== section.id) {
        s.isOpen = false;
      }
    });
    // Toggle la sección actual
    section.isOpen = !section.isOpen;
  }

  isRouteActive(route: string): boolean {
    const currentUrl = this.router.url.split('?')[0]; // Remove query params
    return currentUrl.startsWith('/' + route) || currentUrl.startsWith(route);
  }

  onNavigate(route: string): void {
    this.router.navigate([route]);
    // Mantener el dropdown abierto para continuar explorando
    // Solo cerrar el navbar para mejor UX
    this.appService.appNavNarMode$.next('collapsed');
  }

  trackBySectionId(_index: number, section: NavSectionGroup): string {
    return section.id;
  }

  trackByItemId(_index: number, item: NavSubItem): string {
    return item.id;
  }
}
