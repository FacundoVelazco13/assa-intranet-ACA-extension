import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aca-docs-dashboard',
  imports: [CommonModule],
  templateUrl: './docs-dashboard.component.html',
  styleUrl: './docs-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DocsDashboardComponent {
  /*
  "data": {
              "canBeInactive": true
            },
            "children": [
              {
                "id": "intranet.navbar.oym",
                "order": 200,
                "title": "Organización y Métodos",
                "description": "Documentos del sector de Organización y Métodos",
                "route": "oym"
              },
              {
                "id": "intranet.navbar.md",
                "order": 200,
                "title": "Mesa de entrada",
                "description": "Documentos del sector de Mesa de entrada",
                "route": "md"
              },
              {
                "id": "intranet.navbar.hys",
                "order": 200,
                "title": "Hiegiene y Seguridad",
                "description": "Documentos del sector de Higiene y Seguridad",
                "route": "hys"
              }
            ]
  */
}
