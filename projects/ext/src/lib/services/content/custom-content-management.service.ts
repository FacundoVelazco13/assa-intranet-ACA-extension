/* eslint-disable license-header/header */
import { DocumentListService } from '@alfresco/adf-content-services';
import { NotificationService } from '@alfresco/adf-core';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDossierDialogComponent } from '../../components/DossierDialog/create-dossier-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CustomContentManagementService {
  private readonly createMenuButtonSelector = 'app-toolbar-menu button[id="ext.toolbar.createDossier"]';
  private notificationService = inject(NotificationService);
  private documentListService: DocumentListService = inject(DocumentListService);
  private dialogRef: MatDialog = inject(MatDialog);

  CreateDossierDialog(parentNodeId: string) {
    /**
     * En este punto podría evaluar lo siguiente :
     * - Ruta actual.
     * - Tipo de documento a crear.
     * - Selección de formulario personalizado para el tipo.
     * Luego se desplegaría un formulario personalizado en lugar del genérico,
     * permitiendo la creación de el tipo de dossier requerido segun el contexto.
     */
    const dialogInstance = this.dialogRef.open(CreateDossierDialogComponent, {
      data: { parentNodeId },
      panelClass: 'ext-create-dossier-dialog-container',
      role: 'dialog'
    });

    dialogInstance.componentInstance.createError.subscribe((message: string) => {
      this.notificationService.showError(message);
    });

    dialogInstance.afterClosed().subscribe((dossier) => {
      if (dossier) {
        this.documentListService.reload();
      }
      this.focusAfterClose(this.createMenuButtonSelector);
    });
  }
  private focusAfterClose(focusedElementSelector: string): void {
    if (focusedElementSelector) {
      document.querySelector<HTMLElement>(focusedElementSelector)?.focus();
    }
  }
}
