/* eslint-disable license-header/header */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, ChangeDetectionStrategy, OnInit, ViewEncapsulation, HostListener, inject } from '@angular/core';
import { PathInfo, NodeEntry } from '@alfresco/js-api';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ContentApiService } from '@alfresco/aca-shared';
import { TranslationService } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NameColumnComponent } from '@alfresco/adf-content-services';

@Component({
  imports: [CommonModule, TranslatePipe],
  selector: 'intranet-location-link',
  template: `
    <a
      href="javascript:void(0)"
      [title]="nodeLocation$ | async"
      (click)="onLinkClick($event)"
      class="adf-datatable-cell-value"
      [innerHTML]="displayText | async | translate"
    >
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'aca-location-link adf-location-cell adf-datatable-content-cell'
  }
})
export class IntranetLocationLinkComponent extends NameColumnComponent implements OnInit {
  private contentApi = inject(ContentApiService);
  private translationService = inject(TranslationService);

  private _path: PathInfo;
  node: NodeEntry;

  nodeLocation$ = new BehaviorSubject(this.translationService.instant('APP.BROWSE.SEARCH.UNKNOWN_LOCATION'));
  displayText: Observable<string>;

  @Input()
  context: any;

  @Input()
  showLocation = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.getTooltip(this._path);
  }

  onLinkClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.onClick();
  }

  ngOnInit() {
    if (this.context) {
      const node: NodeEntry = this.context.row.node;
      this.node = node; // Guardar referencia al nodo
      if (node?.entry?.path) {
        const path = node.entry.path;

        if (path?.name && path?.elements) {
          if (this.showLocation) {
            this.displayText = of(path.name.substring(1).replace(/\//g, ' &#8250; '));
          } else {
            this.displayText = this.getDisplayText(path);
          }
          this._path = path;
        } else {
          this.displayText = of('APP.BROWSE.SEARCH.UNKNOWN_LOCATION');
        }
      }
    }
  }

  // todo: review once 5.2.3 is out
  private getDisplayText(path: PathInfo): Observable<string> {
    const elements = path.elements.map((e) => e.name);

    // for admin users
    if (elements.length === 1 && elements[0] === 'Company Home') {
      return of('APP.BROWSE.PERSONAL.TITLE');
    }

    // for non-admin users
    if (elements.length === 3 && elements[0] === 'Company Home' && elements[1] === 'User Homes') {
      return of('APP.BROWSE.PERSONAL.TITLE');
    }

    const result = elements[elements.length - 1];

    if (result === 'documentLibrary') {
      const fragment = path.elements[path.elements.length - 2];

      return new Observable<string>((observer) => {
        this.contentApi.getNodeInfo(fragment.id).subscribe(
          (node) => {
            observer.next(node.properties['cm:title'] || node.name || fragment.name);
            observer.complete();
          },
          () => {
            observer.next(fragment.name);
            observer.complete();
          }
        );
      });
    }

    return of(result);
  }

  // todo: review once 5.2.3 is out
  private getTooltip(path: PathInfo) {
    if (!path) {
      return;
    }

    let result: string = null;

    const elements = path.elements.map((e) => {
      return { ...e };
    });
    const personalFiles = this.translationService.instant('APP.BROWSE.PERSONAL.TITLE');
    const fileLibraries = this.translationService.instant('APP.BROWSE.LIBRARIES.TITLE');

    if (elements[0].name === 'Company Home') {
      elements[0].name = personalFiles;

      if (elements.length > 2) {
        if (elements[1].name === 'Sites') {
          const fragment = elements[2];
          this.contentApi.getNodeInfo(fragment.id).subscribe(
            (node) => {
              elements.splice(0, 2);
              elements[0].name = node.properties['cm:title'] || node.name || fragment.name;
              elements.splice(1, 1);
              elements.unshift({ id: null, name: fileLibraries });

              result = elements.map((e) => e.name).join('/');
              this.nodeLocation$.next(result);
            },
            () => {
              elements.splice(0, 2);
              elements.unshift({ id: null, name: fileLibraries });
              elements.splice(2, 1);

              result = elements.map((e) => e.name).join('/');
              this.nodeLocation$.next(result);
            }
          );
        }

        if (elements[1].name === 'User Homes') {
          elements.splice(0, 3);
          elements.unshift({ id: null, name: personalFiles });
        }
      }
    }

    result = elements.map((e) => e.name).join('/');
    this.nodeLocation$.next(result);
  }
}
