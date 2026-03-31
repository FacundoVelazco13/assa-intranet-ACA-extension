import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PageLayoutComponent } from '@alfresco/aca-shared';

@Component({
  selector: 'aca-hys-dashboard',
  imports: [CommonModule, MatListModule, MatCardModule, PageLayoutComponent],
  templateUrl: './hys-dashboard.component.html',
  styleUrl: './hys-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HysDashboardComponent {
  title = 'Higiene y Seguridad';
  subtitle = 'Bienvenido al área de Higiene y Seguridad';

  description = 'Aquí encontrarás documentación, normas e instructivos para la gestión de higiene y seguridad de ASSA.';
}
