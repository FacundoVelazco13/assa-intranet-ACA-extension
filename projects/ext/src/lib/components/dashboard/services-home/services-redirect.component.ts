import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PageLayoutComponent } from '@alfresco/aca-shared';

@Component({
  selector: 'aca-services-redirect',
  imports: [CommonModule, MatIconModule, PageLayoutComponent],
  templateUrl: './services-redirect.component.html',
  styleUrls: ['./services-redirect.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ServicesRedirectComponent {}
