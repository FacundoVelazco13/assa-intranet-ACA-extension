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
  selector: 'aca-personal-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-navbar.component.html',
  styleUrl: './personal-navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PersonalNavbarComponent {
  private appService = inject(AppService);
  private router = inject(Router);

  title = 'Personal';
  isOpen = false;

  items: NavItem[] = [
    {
      id: 'app.navbar.personalFiles',
      title: 'Mis Archivos',
      route: 'personal-files'
    },
    {
      id: 'app.navbar.libraries.files',
      title: 'Mis Bibliotecas',
      route: 'libraries'
    },
    {
      id: 'app.navbar.libraries.favorite',
      title: 'Bibliotecas Favoritas',
      route: 'favorite/libraries'
    },
    {
      id: 'app.navbar.recentFiles',
      title: 'Recientes',
      route: 'recent-files'
    },
    {
      id: 'app.navbar.favorites',
      title: 'Favoritos',
      route: 'favorites'
    },
    {
      id: 'app.navbar.shared',
      title: 'Compartidos',
      route: 'shared'
    },
    {
      id: 'app.navbar.trashcan',
      title: 'Papelera',
      route: 'trashcan'
    }
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
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
