/*!
 * Copyright © 2005-2025 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Alfresco Example Content Application
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail. Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * from Hyland Software. If not, see <http://www.gnu.org/licenses/>.
 */

import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchEntryHighlight } from '@alfresco/js-api';
import { BehaviorSubject } from 'rxjs';
import { NameColumnComponent, NodesApiService } from '@alfresco/adf-content-services';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DatatableCellBadgesComponent } from '@alfresco/aca-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IntranetLocationLinkComponent } from './intranet-location-link/intranet-location-link.component';

@Component({
  imports: [CommonModule, MatDialogModule, DatatableCellBadgesComponent, IntranetLocationLinkComponent],
  selector: 'aca-search-results-row',
  templateUrl: './intranet-search-results-row.component.html',
  styleUrls: ['./intranet-search-results-row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'aca-search-results-row' }
})
export class IntranetSearchResultsRowComponent extends NameColumnComponent implements OnInit {
  private readonly highlightPrefix = `<span class="aca-highlight">`;
  private readonly highlightPostfix = `</span>`;

  private readonly highlightOpenEscapedRegex = /&lt;span class=(['"])aca-highlight\1&gt;/g;
  private readonly highlightCloseEscapedRegex = /&lt;\/span&gt;/g;

  private readonly highlightOpenRawRegex = /<span class=(['"])aca-highlight\1>/g;
  private readonly highlightCloseRawRegex = /<\/span>/g;

  private readonly escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };

  name$ = new BehaviorSubject<string>('');
  title$ = new BehaviorSubject<string>('');
  description$ = new BehaviorSubject<string>('');
  content$ = new BehaviorSubject<string>('');
  nameStripped = '';
  titleStripped = '';
  descriptionStripped = '';
  contentStripped = '';
  isFile = false;

  private readonly destroy = inject(DestroyRef);

  constructor(
    element: ElementRef,
    private readonly nodesService: NodesApiService
  ) {
    super(element, nodesService);
  }
  ngOnInit() {
    this.updateValues();

    this.nodesService.nodeUpdated.pipe(takeUntilDestroyed(this.destroy)).subscribe((node) => {
      const row = this.context.row;
      if (row) {
        const { entry } = row.node;

        if (entry.id === node.id) {
          entry.name = node.name;
          entry.properties = { ...node.properties };

          this.updateValues();
        }
      }
    });
  }

  private updateValues() {
    this.node = this.context.row.node;
    this.isFile = this.node.entry.isFile;

    const highlights: SearchEntryHighlight[] = this.node.entry['search']?.['highlight'];
    let name = this.node.entry.name;
    const properties = this.node.entry.properties;
    let title = properties?.['cm:title'] || '';
    let description = properties?.['cm:description'] || '';
    let content = '';

    highlights?.forEach((highlight) => {
      switch (highlight.field) {
        case 'cm:name':
          name = highlight.snippets[0];
          break;
        case 'cm:title':
          title = highlight.snippets[0];
          break;
        case 'cm:description':
          description = highlight.snippets[0];
          break;
        case 'cm:content':
          content = `...${highlight.snippets[0]}...`;
          break;
        default:
          break;
      }
    });

    const safeName = this.sanitizeAndHighlight(name);
    const safeDescription = this.sanitizeAndHighlight(description);
    const safeContent = this.sanitizeAndHighlight(content);

    this.name$.next(safeName);
    this.description$.next(safeDescription);
    this.content$.next(safeContent);

    this.nameStripped = this.stripHighlighting(name);
    this.titleStripped = this.stripHighlighting(title);
    this.descriptionStripped = this.stripHighlighting(description);
    this.contentStripped = this.stripHighlighting(content);

    if (title && title !== name) {
      const safeTitle = this.sanitizeAndHighlight(` ( ${title} )`);
      this.title$.next(safeTitle);
      this.titleStripped = this.stripHighlighting(title);
    } else {
      this.title$.next('');
    }
  }

  onLinkClick(event: Event) {
    event.stopPropagation();
    this.onClick();
  }

  private stripHighlighting(input: string): string {
    if (!input) {
      return '';
    }
    return input.replace(this.highlightOpenRawRegex, '').replace(this.highlightCloseRawRegex, '');
  }

  private sanitizeAndHighlight(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    let escaped = value.replace(/[&<>]/g, (char) => this.escapeMap[char] ?? char);

    escaped = escaped.replace(this.highlightOpenEscapedRegex, this.highlightPrefix).replace(this.highlightCloseEscapedRegex, this.highlightPostfix);

    return escaped;
  }
}
