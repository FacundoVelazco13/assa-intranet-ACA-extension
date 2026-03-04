/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntranetPageComponent } from './intranet-page.component';

describe('IntranetPageComponent', () => {
  let component: IntranetPageComponent;
  let fixture: ComponentFixture<IntranetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntranetPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IntranetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
