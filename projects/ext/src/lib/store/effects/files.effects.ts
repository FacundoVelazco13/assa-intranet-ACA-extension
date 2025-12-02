/* eslint-disable license-header/header */
import { Injectable, inject, NgZone, RendererFactory2 } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppStore, getAppSelection } from '@alfresco/aca-shared/store';
import { FileUtils } from '@alfresco/adf-core';
import { FileModel, UploadService } from '@alfresco/adf-content-services';
import { ADD_FILES, AddFilesAction } from '../actions/files.actions';

@Injectable()
export class FilesEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppStore>);
  private ngZone = inject(NgZone);
  private uploadService = inject(UploadService);

  private readonly fileInput: HTMLInputElement;

  constructor() {
    const renderer = inject(RendererFactory2).createRenderer(null, null);

    // Create hidden file input element
    this.fileInput = renderer.createElement('input') as HTMLInputElement;
    this.fileInput.id = 'ext-upload-files';
    this.fileInput.type = 'file';
    this.fileInput.style.display = 'none';
    this.fileInput.setAttribute('multiple', '');
    this.fileInput.addEventListener('change', (event) => this.uploadFiles(event));
    renderer.appendChild(document.body, this.fileInput);
  }

  /**
   * Effect that handles the "Add Files" action
   * Opens the file picker dialog
   */
  addFiles$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<AddFilesAction>(ADD_FILES),
        map(() => {
          // Trigger the hidden file input
          this.fileInput.click();
        })
      ),
    { dispatch: false }
  );

  /**
   * Upload files to the selected node
   */
  private uploadFiles(event: Event): void {
    this.store
      .select(getAppSelection)
      .pipe(take(1))
      .subscribe((selection) => {
        // Get the target node (first selected node or file)
        const targetNode = selection?.nodes?.[0]?.entry || selection?.file?.entry;

        if (targetNode?.id) {
          const input = event.currentTarget as HTMLInputElement;
          const files = FileUtils.toFileArray(input.files).map(
            (file: File) =>
              new FileModel(file, {
                parentId: targetNode.id,
                nodeType: 'cm:content'
              })
          );

          this.uploadQueue(files);
          // Clear the input value so the same file can be selected again
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          event.target && ((event.target as HTMLInputElement).value = '');
        }
      });
  }

  /**
   * Add files to upload queue and start upload
   */
  private uploadQueue(files: FileModel[]): void {
    if (files.length > 0) {
      this.ngZone.run(() => {
        this.uploadService.addToQueue(...files);
        this.uploadService.uploadFilesInTheQueue();
      });
    }
  }
}
