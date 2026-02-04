/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiDashboardComponent } from './gi-dashboard.component';

describe('GiDashboardComponent', () => {
  let component: GiDashboardComponent;
  let fixture: ComponentFixture<GiDashboardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiDashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
