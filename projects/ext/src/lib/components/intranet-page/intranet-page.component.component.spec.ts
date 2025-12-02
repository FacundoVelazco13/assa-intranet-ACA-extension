/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntranetPageComponentComponent } from './intranet-page.component.component';

describe('IntranetPageComponentComponent', () => {
  let component: IntranetPageComponentComponent;
  let fixture: ComponentFixture<IntranetPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntranetPageComponentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IntranetPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
