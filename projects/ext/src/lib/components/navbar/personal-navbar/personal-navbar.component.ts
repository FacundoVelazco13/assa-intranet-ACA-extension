import { Component, inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '@alfresco/aca-shared';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

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
export class PersonalNavbarComponent implements OnInit, OnDestroy {
  private appService = inject(AppService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

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

  ngOnInit(): void {
    // Detect if current route is a personal route
    this.updateOpenStateFromRoute();

    // Listen to route changes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateOpenStateFromRoute();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateOpenStateFromRoute(): void {
    const currentUrl = this.router.url.split('?')[0];
    // Check if current route matches any personal item
    this.isOpen = this.items.some((item) => currentUrl === '/' + item.route || currentUrl === item.route);
  }

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
