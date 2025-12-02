import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PageLayoutComponent } from '@alfresco/aca-shared';

@Component({
  selector: 'aca-oym-dashboard',
  imports: [CommonModule, MatListModule, MatCardModule, PageLayoutComponent],
  templateUrl: './oym-dashboard.component.html',
  styleUrl: './oym-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OymDashboardComponent {}
