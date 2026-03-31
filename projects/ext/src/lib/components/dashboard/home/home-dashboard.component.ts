import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@alfresco/aca-shared';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'aca-home-dashboard',
  imports: [CommonModule, RouterLink, PageLayoutComponent, MatCardModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeDashboardComponent {}
