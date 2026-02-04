/* eslint-disable license-header/header */
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PageLayoutComponent } from '@alfresco/aca-shared';

@Component({
  selector: 'aca-gi-dashboard',
  imports: [CommonModule, MatListModule, MatCardModule, PageLayoutComponent],
  templateUrl: './gi-dashboard.component.html',
  styleUrl: './gi-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GiDashboardComponent {
  title = 'Gestión Institucional';
  subtitle = 'Bienvenido al área de Gestión Institucional';

  description = 'Aquí encontrarás información y recursos sobre la gestión institucional de ASSA.';
}
