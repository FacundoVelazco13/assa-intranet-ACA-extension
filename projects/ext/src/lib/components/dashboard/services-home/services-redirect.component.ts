/* eslint-disable license-header/header */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'aca-services-redirect',
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
      <p>Redirigiendo a la Guía Telefónica...</p>
      <p style="margin-top: 20px;">
        Si no eres redirigido automáticamente, <a href="http://aguas/intranet/mda/informa7.asp" target="_blank">haz clic aquí</a>
      </p>
    </div>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ServicesRedirectComponent implements OnInit {
  ngOnInit(): void {
    // Redirección automática en nueva pestaña al cargar el componente
    window.open('http://aguas/intranet/mda/informa7.asp', '_blank');
  }
}
