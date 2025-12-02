/* eslint-disable license-header/header */
import { Observable } from 'rxjs';
import { Component, DestroyRef, EventEmitter, inject, Inject, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Node } from '@alfresco/js-api';
import { TranslationService } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomNodeApiService } from '../../services/node-api/custom-node-api.service';

@Component({
  selector: 'app-create-dossier-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-dossier-dialog.component.html',
  styleUrls: ['./create-dossier-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-create-dossier-dialog' }
})
export class CreateDossierDialogComponent implements OnInit {
  @Output() createError = new EventEmitter<any>();
  @Output() success = new EventEmitter<Node>();

  form: UntypedFormGroup;
  disableSubmitButton = false;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialogRef<CreateDossierDialogComponent>,
    private nodeApi: CustomNodeApiService,
    private translation: TranslationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      title: [''],
      description: ['']
      // Agrega más campos si tu dossier lo requiere
    });
    this.form.controls['name'].valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => (this.disableSubmitButton = false));
  }

  submit() {
    this.disableSubmitButton = true;
    this.create().subscribe({
      next: (dossier: Node) => {
        // Creo que nadie se esta suscribiendo a este evento
        this.success.emit(dossier);
        this.dialog.close(dossier);
      },
      error: (err) => this.handleError(err)
    });
  }

  handleError(error: any): any {
    const errorMessage = 'Error al crear el dossier';
    this.createError.emit(this.translation.instant(errorMessage));
    return error;
  }

  private create(): Observable<Node> {
    const parentNodeId = this.data.parentNodeId;
    const dossierData = {
      name: this.form.value.name,
      title: this.form.value.title,
      description: this.form.value.description
    };
    return this.nodeApi.createDossier(parentNodeId, dossierData);
  }
}
