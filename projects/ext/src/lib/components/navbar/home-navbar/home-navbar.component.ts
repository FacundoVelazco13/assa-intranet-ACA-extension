import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from '@alfresco/aca-shared';

@Component({
  selector: 'aca-home-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeNavbarComponent {
  private appService = inject(AppService);
  private router = inject(Router);

  title = 'Inicio';
  route = 'intranet/dashboard';

  onNavigate(): void {
    this.router.navigate([this.route]);
    this.appService.appNavNarMode$.next('collapsed');
  }
}
