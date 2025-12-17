/* eslint-disable license-header/header */
import { ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NodeEntry, Pagination, ResultSetPaging } from '@alfresco/js-api';
import { ActivatedRoute, NavigationStart } from '@angular/router';
import {
  DocumentListComponent,
  ResetSearchDirective,
  SavedSearch,
  SearchConfiguration,
  SearchFilterChipsComponent,
  SearchFormComponent,
  SearchQueryBuilderService,
  TagService
} from '@alfresco/adf-content-services';
import {
  infoDrawerPreview,
  SetInfoDrawerPreviewStateAction,
  SetInfoDrawerStateAction,
  SetSearchItemsTotalCountAction,
  ShowInfoDrawerPreviewAction
} from '@alfresco/aca-shared/store';
import {
  CustomEmptyContentTemplateDirective,
  DataColumnComponent,
  DataColumnListComponent,
  DateColumnHeaderComponent,
  NotificationService,
  PaginationComponent,
  TranslationService
} from '@alfresco/adf-core';
import { ContextActionsDirective, PageComponent, PageLayoutComponent, PaginationDirective, ToolbarComponent } from '@alfresco/aca-shared';
import { SearchSortingDefinition } from '@alfresco/adf-content-services/lib/search/models/search-sorting-definition.interface';
import { filter, first, map, startWith, switchMap, take, tap, toArray } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import {
  DocumentListDirective,
  ThumbnailColumnComponent,
  SearchActionMenuComponent,
  BulkActionsDropdownComponent,
  extractFiltersFromEncodedQuery,
  extractSearchedWordFromEncodedQuery,
  extractUserQueryFromEncodedQuery,
  formatSearchTerm,
  SaveSearchDirective,
  IsFeatureSupportedInCurrentAcsPipe,
  SavedSearchesContextService
} from '@alfresco/aca-content';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DocumentListPresetRef, DynamicColumnComponent } from '@alfresco/adf-extensions';
import { combineLatest, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule } from '@angular/material/menu';
import { IntranetSearchInputComponent } from '../intranet-search-input-component/intranet-search-input.component';
import { NavigateToIntranetFolder } from '../../../store/actions/intranet-router.actions';

@Component({
  selector: 'aca-intranet-search-result',
  imports: [
    CommonModule,
    TranslatePipe,
    IntranetSearchInputComponent,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    DocumentListDirective,
    ContextActionsDirective,
    ThumbnailColumnComponent,
    SearchActionMenuComponent,
    PaginationComponent,
    MatIconModule,
    PaginationDirective,
    PageLayoutComponent,
    ToolbarComponent,
    DynamicColumnComponent,
    SearchFormComponent,
    ResetSearchDirective,
    SearchFilterChipsComponent,
    DocumentListComponent,
    DataColumnListComponent,
    DataColumnComponent,
    DateColumnHeaderComponent,
    CustomEmptyContentTemplateDirective,
    BulkActionsDropdownComponent,
    SaveSearchDirective,
    IsFeatureSupportedInCurrentAcsPipe
  ],
  templateUrl: './intranet-search-result.component.html',
  styleUrl: './intranet-search-result.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class IntranetSearchResultComponent extends PageComponent implements OnInit {
  private notificationService = inject(NotificationService);

  infoDrawerPreview$ = this.store.select(infoDrawerPreview);

  searchedWord: string;
  queryParamName = 'q';
  data: ResultSetPaging;
  sorting = ['name', 'asc'];
  isLoading = false;
  totalResults: number;
  isTagsEnabled = false;
  initialSavedSearch: SavedSearch = undefined;
  columns: DocumentListPresetRef[] = [];
  encodedQuery: string;
  searchConfig: SearchConfiguration;

  private previousEncodedQuery: string;

  constructor(
    tagsService: TagService,
    private readonly queryBuilder: SearchQueryBuilderService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly translationService: TranslationService,
    private readonly savedSearchesService: SavedSearchesContextService
  ) {
    super();

    this.isTagsEnabled = tagsService.areTagsEnabled();

    queryBuilder.paging = {
      skipCount: 0,
      maxItems: 25
    };

    this.queryBuilder.configUpdated.pipe(takeUntilDestroyed()).subscribe((searchConfig) => {
      this.searchConfig = searchConfig;
      this.updateUserQuery();
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.queryBuilder.resetToDefaults();
    this.sorting = this.getSorting();

    this.subscriptions.push(
      this.queryBuilder.updated.subscribe((query) => {
        this.isLoading = true;
        if (query) {
          this.sorting = this.getSorting();
          this.changeDetectorRef.detectChanges();
        }
      }),

      this.queryBuilder.executed.subscribe((data) => {
        this.queryBuilder.paging.skipCount = 0;

        this.onSearchResultLoaded(data);
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }),

      this.queryBuilder.error.subscribe((err: any) => {
        this.onSearchError(err);
      }),

      this.queryBuilder.filterQueryUpdate.subscribe(() => {
        this.isLoading = true;
      })
    );

    this.columns = this.extensions.documentListPresets.searchResults || [];

    // Reemplazar el template de búsqueda por el template estándar que emite name-click
    this.columns = this.columns.map((col) => {
      if (col.template === 'app.search.columns.name') {
        return { ...col, template: 'intranet-search-results-row.component' };
      }
      return col;
    });

    if (this.route) {
      this.route.queryParams
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          switchMap((params) =>
            this.savedSearchesService.getSavedSearches().pipe(
              first(),
              map((savedSearches) => savedSearches.find((savedSearch) => savedSearch.encodedUrl === encodeURIComponent(params[this.queryParamName])))
            )
          )
        )
        .subscribe((savedSearches) => {
          this.initialSavedSearch = savedSearches;
        });

      combineLatest([
        this.route.queryParams,
        this.router.events.pipe(
          filter((e): e is NavigationStart => e instanceof NavigationStart),
          startWith(null)
        )
      ])
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap(([params]) => {
            this.encodedQuery = params[this.queryParamName];
            this.isLoading = !!this.encodedQuery;

            this.searchedWord = extractSearchedWordFromEncodedQuery(this.encodedQuery);
            this.updateUserQuery();

            const filtersFromEncodedQuery = extractFiltersFromEncodedQuery(this.encodedQuery);
            this.queryBuilder.populateFilters.next(filtersFromEncodedQuery || {});
          }),
          switchMap(([, navigationStartEvent]) => {
            const filtersToLoad = this.queryBuilder.categories.length;

            const filtersAreLoaded = filtersToLoad ? this.queryBuilder.filterLoaded.pipe(take(filtersToLoad), toArray()) : of(null);

            return filtersAreLoaded.pipe(map(() => navigationStartEvent));
          })
        )
        .subscribe((navigationStartEvent) => {
          const shouldExecuteQuery = this.shouldExecuteQuery(navigationStartEvent, this.encodedQuery);
          this.queryBuilder.userQuery = extractUserQueryFromEncodedQuery(this.encodedQuery);
          if (!this.searchedWord && !this.queryBuilder.userQuery && this.encodedQuery) {
            this.queryBuilder.userQuery = formatSearchTerm('*', this.searchConfig['app:fields']);
          }

          if (shouldExecuteQuery) {
            this.queryBuilder.execute(false);
          }
        });
    }
  }

  onSearchError(error: { message: any }) {
    let message: string;
    try {
      const { statusCode } = JSON.parse(error.message).error;

      const messageKey = `APP.BROWSE.SEARCH.ERRORS.${statusCode}`;
      message = this.translationService.instant(messageKey);

      if (message === messageKey) {
        message = this.translationService.instant(`APP.BROWSE.SEARCH.ERRORS.GENERIC`);
      }
    } catch {
      message = error.message;
    }

    this.notificationService.showError(message);
  }

  onSearchResultLoaded(nodePaging: ResultSetPaging) {
    this.data = nodePaging;
    this.totalResults = this.getNumberOfResults();
    this.store.dispatch(new SetSearchItemsTotalCountAction(this.totalResults));
  }

  getNumberOfResults() {
    if (this.data?.list?.pagination) {
      return this.data.list.pagination.totalItems;
    }
    return 0;
  }

  onPaginationChanged(pagination: Pagination) {
    this.queryBuilder.paging = {
      maxItems: pagination.maxItems,
      skipCount: pagination.skipCount
    };
    this.queryBuilder.update();
  }

  private getSorting(): string[] {
    const primary = this.queryBuilder.getPrimarySorting();

    if (primary) {
      return [primary.key, primary.ascending ? 'asc' : 'desc'];
    }

    return ['name', 'asc'];
  }

  onNodeDoubleClick(node: NodeEntry) {
    if (node?.entry) {
      if (node.entry.isFolder) {
        this.store.dispatch(new NavigateToIntranetFolder(node));
        return;
      }
      this.showPreview(node, { path: this.router.url });
    }
  }

  handleNodeClick(event: Event) {
    this.onNodeDoubleClick((event as CustomEvent).detail?.node);
  }

  onPreviewClosed() {
    this.store.dispatch(new ShowInfoDrawerPreviewAction());
  }

  onDrawerClosed() {
    this.store.dispatch(new SetInfoDrawerPreviewStateAction(false));
    this.store.dispatch(new SetInfoDrawerStateAction(false));
  }

  onSearchSortingUpdate(option: SearchSortingDefinition) {
    this.queryBuilder.sorting = [{ ...option, ascending: option.ascending }];
    this.queryBuilder.update();
  }

  editSavedSearch(searchToSave: SavedSearch) {
    searchToSave.encodedUrl = this.encodedQuery;
    this.savedSearchesService
      .editSavedSearch(searchToSave)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.notificationService.showInfo('APP.BROWSE.SEARCH.SAVE_SEARCH.EDIT_DIALOG.SUCCESS_MESSAGE');
        },
        error: () => {
          this.notificationService.showError('APP.BROWSE.SEARCH.SAVE_SEARCH.EDIT_DIALOG.ERROR_MESSAGE');
        }
      });
  }

  private updateUserQuery(): void {
    const updatedUserQuery = formatSearchTerm(this.searchedWord, this.searchConfig['app:fields']);
    this.queryBuilder.userQuery = updatedUserQuery;
  }

  private shouldExecuteQuery(navigationStartEvent: NavigationStart | null, query: string | undefined): boolean {
    const hasQueryChanged = query !== this.previousEncodedQuery;
    this.previousEncodedQuery = query;

    if (!navigationStartEvent || navigationStartEvent.navigationTrigger === 'popstate' || navigationStartEvent.navigationTrigger === 'hashchange') {
      return true;
    } else if (navigationStartEvent.navigationTrigger === 'imperative') {
      return hasQueryChanged;
    } else {
      return !!query;
    }
  }
}
