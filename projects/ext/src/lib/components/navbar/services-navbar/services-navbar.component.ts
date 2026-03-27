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
  selector: 'aca-services-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-navbar.component.html',
  styleUrl: './services-navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ServicesNavbarComponent implements OnInit, OnDestroy {
  private appService = inject(AppService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  title = 'Servicios';
  isOpen = false;

  items: NavItem[] = [
    {
      id: 'intranet.navbar.customService',
      title: 'Guía Telefónica',
      route: 'intranet/services'
    }
  ];

  ngOnInit(): void {
    // Detect if current route is a services route
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
    // Check if current route matches any services item
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
