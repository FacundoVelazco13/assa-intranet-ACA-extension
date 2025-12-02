import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OymDashboardComponent } from './oym-dashboard.component';

describe('OymDashboardComponent', () => {
  let component: OymDashboardComponent;
  let fixture: ComponentFixture<OymDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OymDashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OymDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
