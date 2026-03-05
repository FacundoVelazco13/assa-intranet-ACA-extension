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
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomNodeApiService } from '../../services/node-api/custom-node-api.service';

@Component({
  selector: 'app-create-record-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './create-record-dialog.component.html',
  styleUrls: ['./create-record-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-create-record-dialog' }
})
export class CreateRecordDialogComponent implements OnInit {
  @Output() createError = new EventEmitter<any>();
  @Output() success = new EventEmitter<Node>();

  form: UntypedFormGroup;
  disableSubmitButton = false;

  recordTypes = [{ value: 'hys:ppye', label: 'Ficha Higiene y Seguridad' }];

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialogRef<CreateRecordDialogComponent>,
    private nodeApi: CustomNodeApiService,
    private translation: TranslationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      nodeType: ['cm:content', [Validators.required]]
    });
    this.form.controls['name'].valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => (this.disableSubmitButton = false));
  }

  submit() {
    this.disableSubmitButton = true;
    this.create().subscribe({
      next: (record: Node) => {
        this.success.emit(record);
        this.dialog.close(record);
      },
      error: (err) => this.handleError(err)
    });
  }

  handleError(error: any): any {
    const errorMessage = 'Error al crear el record';
    this.createError.emit(this.translation.instant(errorMessage));
    return error;
  }

  private create(): Observable<Node> {
    const parentNodeId = this.data.parentNodeId;
    const recordData = {
      name: this.form.value.name,
      description: this.form.value.description,
      nodeType: this.form.value.nodeType
    };
    return this.nodeApi.createRecord(parentNodeId, recordData);
  }
}
