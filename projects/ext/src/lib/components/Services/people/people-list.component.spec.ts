import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleListComponent } from './people-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleListComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load people on init', () => {
    expect(component.people.length).toBeGreaterThan(0);
    expect(component.isLoading).toBe(false);
  });

  it('should filter people on search', () => {
    component.searchQuery = 'Juan';
    component.onSearch();
    expect(component.filteredPeople.length).toBeLessThanOrEqual(component.people.length);
  });

  it('should clear search', () => {
    component.searchQuery = 'Test';
    component.clearSearch();
    expect(component.searchQuery).toBe('');
    expect(component.filteredPeople.length).toBe(component.people.length);
  });

  it('should paginate correctly', () => {
    component.pageSize = 5;
    component.pageIndex = 0;
    component.updatePaginatedData();
    expect(component.paginatedPeople.length).toBeLessThanOrEqual(5);
  });
});
