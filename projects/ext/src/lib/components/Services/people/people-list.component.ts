import { Component, OnInit, ViewEncapsulation, inject, DestroyRef } from '@angular/core';
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
import { AdfHttpClient, RequestOptions } from '@alfresco/adf-core/api';
import { from } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageLayoutComponent } from '@alfresco/aca-shared';

export interface Person {
  friendlyname: string;
  email: string;
  org_name: string;
  employee_number: string;
  location_name: string;
  mobile_phone: string;
}
export interface ApiResponse {
  success: boolean;
  statusCode: number;
  operation: string;
  // eslint-disable-next-line prettier/prettier
  class: string;
  key: string;
  data: DataResponse;
}
export interface DataResponse {
  code: number;
  message: string;
  objects: PersonObject[];
}

export interface PersonObject {
  code: number;
  // eslint-disable-next-line prettier/prettier
  class: string;
  key: string;
  fields: Person;
}

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
  private readonly adfHttpClient = inject(AdfHttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);

  private url = 'alfresco/s/api/itop/mock';

  private opts: RequestOptions = {
    httpMethod: 'GET',
    contentTypes: ['application/json'],
    accepts: ['application/json']
  };

  people: Person[] = [];

  displayedColumns: string[] = ['friendlyname', 'email', 'org_name', 'employee_number', 'location_name', 'mobile_phone'];

  isLoading = true;
  searchQuery = '';

  filteredPeople: Person[] = [];
  paginatedPeople: Person[] = [];

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  totalItems = 0;

  ngOnInit() {
    this.isLoading = true;

    from(this.adfHttpClient.request(this.url, this.opts))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const { success, statusCode, operation, class: itop_class, key, data } = response as ApiResponse;

          if (!success) {
            this.showError(`API responded with error: ${statusCode} - ${operation} on ${itop_class} (${key})`);
            this.isLoading = false;
            return;
          }

          const { code, message, objects } = data as DataResponse;

          if (!objects) {
            this.showError(`API response missing 'objects', code: ${code}, message: ${message}`);
            this.isLoading = false;
            return;
          }

          Object.values(objects).map((person_objects: PersonObject) => {
            const { fields } = person_objects;

            if (fields) {
              this.people.push(fields);
            }
            this.filteredPeople = [...this.people];
            this.totalItems = this.filteredPeople.length;
            this.updatePaginatedData();
            this.isLoading = false;
          });
        },
        error: (error) => {
          console.error('Error fetching people data:', error);
          this.showError('Error al cargar personas');
          this.isLoading = false;
        }
      });
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
