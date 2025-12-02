import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsDashboardComponentComponent } from './docs-dashboard.component';

describe('DocsDashboardComponentComponent', () => {
  let component: DocsDashboardComponentComponent;
  let fixture: ComponentFixture<DocsDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsDashboardComponentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DocsDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
