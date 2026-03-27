import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from '@alfresco/aca-shared';

interface NavItem {
  id: string;
  title: string;
  route: string;
}

@Component({
  selector: 'aca-services-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-navbar.component.html',
  styleUrl: './services-navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ServicesNavbarComponent {
  private appService = inject(AppService);
  private router = inject(Router);

  title = 'Servicios';
  isOpen = false;

  items: NavItem[] = [
    {
      id: 'intranet.navbar.customService',
      title: 'Guía Telefónica',
      route: 'intranet/services'
    }
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
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

  trackByItemId(_index: number, item: NavItem): string {
    return item.id;
  }
}
