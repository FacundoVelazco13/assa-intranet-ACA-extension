import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { PageLayoutComponent } from '@alfresco/aca-shared';
import { ItopPerson } from '../../../models/itop-types';
import { ItopService } from '../../../services/itop/itop.service';

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
    FormsModule,
    PageLayoutComponent
  ],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PeopleListComponent implements OnInit {
  private readonly snackBar = inject(MatSnackBar);
  private readonly itopService = inject(ItopService);

  people: ItopPerson[] = [];

  displayedColumns: string[] = ['friendlyname', 'email', 'org_name', 'employee_number', 'location_name', 'mobile_phone'];

  isLoading = true;
  searchQuery = '';

  filteredPeople: ItopPerson[] = [];
  paginatedPeople: ItopPerson[] = [];

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  totalItems = 0;

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.people = await this.itopService.getItopPeople();
      this.filteredPeople = [...this.people];
      this.totalItems = this.filteredPeople.length;
      this.updatePaginatedData();
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching people data:', error);
      this.showError('Error al cargar los datos de personas.');
      this.isLoading = false;
    }
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

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredPeople = [...this.people];
    } else {
      this.filteredPeople = this.people.filter(
        (person) =>
          person.friendlyname.toLowerCase().includes(query) ||
          person.email.toLowerCase().includes(query) ||
          person.org_name.toLowerCase().includes(query) ||
          person.employee_number.includes(query) ||
          person.location_name.toLowerCase().includes(query) ||
          person.mobile_phone.includes(query)
      );
    }
    this.totalItems = this.filteredPeople.length;
    this.pageIndex = 0;
    this.updatePaginatedData();
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearch();
  }
}
