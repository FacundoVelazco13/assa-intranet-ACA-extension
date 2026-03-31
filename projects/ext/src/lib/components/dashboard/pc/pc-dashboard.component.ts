import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PageLayoutComponent } from '@alfresco/aca-shared';

@Component({
  selector: 'aca-pc-dashboard',
  imports: [CommonModule, MatListModule, MatCardModule, PageLayoutComponent],
  templateUrl: './pc-dashboard.component.html',
  styleUrl: './pc-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PcDashboardComponent {
  title = 'Políticas Comerciales';
  subtitle = 'Bienvenido al área de Políticas Comerciales';

  description = 'Aquí encontrarás documentación e información de referencia para la gestión de políticas comerciales de ASSA.';
}
