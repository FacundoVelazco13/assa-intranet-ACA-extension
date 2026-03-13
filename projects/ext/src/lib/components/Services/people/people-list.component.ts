import { Component, OnInit, ViewEncapsulation, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { PageLayoutComponent } from '@alfresco/aca-shared';
import { ItopPerson } from '../../../models/itop-types';
import { ItopService } from '../../../services/itop/itop.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'aca-people-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatMenuModule,
    FormsModule,
    PageLayoutComponent
  ],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PeopleListComponent implements OnInit, OnDestroy {
  private readonly snackBar = inject(MatSnackBar);
  private readonly itopService = inject(ItopService);
  private readonly destroy$ = new Subject<void>();
  private readonly searchSubject$ = new Subject<string>();

  people: ItopPerson[] = [];
  displayedColumns: string[] = ['expand', 'employee_number', 'friendlyname', 'email', 'org_name', 'location_name', 'mobile_phone'];

  isLoading = true;
  searchQuery = '';
  viewMode: 'table' | 'card' = 'table';

  filteredPeople: ItopPerson[] = [];
  paginatedPeople: ItopPerson[] = [];

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  totalItems = 0;

  // Sorting
  sortColumn: keyof ItopPerson | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filtering
  showFilters = false;
  selectedOrganizations: Set<string> = new Set();
  selectedLocations: Set<string> = new Set();
  availableOrganizations: string[] = [];
  availableLocations: string[] = [];

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.people = await this.itopService.getItopPeople();
      this.filteredPeople = [...this.people];
      this.totalItems = this.filteredPeople.length;

      // Extract unique organizations and locations
      this.availableOrganizations = [...new Set(this.people.map((p) => p.org_name))].sort();
      this.availableLocations = [...new Set(this.people.map((p) => p.location_name))].sort();

      this.updatePaginatedData();
      this.isLoading = false;

      // Setup reactive search
      this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((query) => {
        this.performSearch(query);
      });
    } catch (error) {
      console.error('Error fetching people data:', error);
      this.showError('Error al cargar los datos de personas.');
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  getMaxPageItems(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.totalItems);
  }

  updatePaginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPeople = this.filteredPeople.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  onSearchInput(value: string) {
    this.searchQuery = value;
    this.searchSubject$.next(value);
  }

  private performSearch(query: string) {
    const queryLower = query.toLowerCase().trim();

    if (!queryLower) {
      this.filteredPeople = [...this.people];
    } else {
      this.filteredPeople = this.people.filter(
        (person) =>
          person.friendlyname.toLowerCase().includes(queryLower) ||
          person.email.toLowerCase().includes(queryLower) ||
          person.org_name.toLowerCase().includes(queryLower) ||
          person.employee_number.includes(queryLower) ||
          person.location_name.toLowerCase().includes(queryLower) ||
          person.mobile_phone.includes(queryLower)
      );
    }
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.filteredPeople];

    // Apply dynamic filters
    if (this.selectedOrganizations.size > 0) {
      result = result.filter((p) => this.selectedOrganizations.has(p.org_name));
    }
    if (this.selectedLocations.size > 0) {
      result = result.filter((p) => this.selectedLocations.has(p.location_name));
    }

    this.filteredPeople = result;
    this.totalItems = this.filteredPeople.length;
    this.pageIndex = 0;
    this.updatePaginatedData();
  }

  toggleOrganizationFilter(org: string): void {
    if (this.selectedOrganizations.has(org)) {
      this.selectedOrganizations.delete(org);
    } else {
      this.selectedOrganizations.add(org);
    }
    this.applyFilters();
  }

  toggleLocationFilter(location: string): void {
    if (this.selectedLocations.has(location)) {
      this.selectedLocations.delete(location);
    } else {
      this.selectedLocations.add(location);
    }
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.selectedOrganizations.clear();
    this.selectedLocations.clear();
    this.applyFilters();
  }

  isOrganizationSelected(org: string): boolean {
    return this.selectedOrganizations.has(org);
  }

  isLocationSelected(location: string): boolean {
    return this.selectedLocations.has(location);
  }

  getActiveFiltersCount(): number {
    return this.selectedOrganizations.size + this.selectedLocations.size;
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchSubject$.next('');
  }

  toggleViewMode(mode: 'table' | 'card') {
    this.viewMode = mode;
  }

  getInitials(friendlyname: string): string {
    return friendlyname
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  getAvatarColor(index: number): string {
    const colors = [
      '#3f51b5',
      '#2196f3',
      '#00bcd4',
      '#009688',
      '#4caf50',
      '#8bc34a',
      '#cddc39',
      '#ffeb3b',
      '#ffc107',
      '#ff9800',
      '#ff5722',
      '#f44336',
      '#e91e63',
      '#9c27b0'
    ];
    return colors[index % colors.length];
  }
  // Sorting
  onSortColumn(column: keyof ItopPerson) {
    if (this.sortColumn === column) {
      // Toggle direction if same column
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  private applySorting() {
    if (!this.sortColumn) {
      return;
    }

    this.filteredPeople.sort((a, b) => {
      const aVal = a[this.sortColumn as keyof ItopPerson];
      const bVal = b[this.sortColumn as keyof ItopPerson];

      let comparison = 0;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.pageIndex = 0;
    this.updatePaginatedData();
  }

  isSortedBy(column: keyof ItopPerson): boolean {
    return this.sortColumn === column;
  }

  getSortIcon(column: keyof ItopPerson): string {
    if (this.sortColumn !== column) {
      return 'unfold_more';
    }
    return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  copyToClipboard(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.snackBar.open('Copiado al portapapeles', 'Cerrar', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      })
      .catch(() => {
        this.showError('Error al copiar al portapapeles');
      });
  }
}
