/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DossierViewComponent } from './dossier-view.component';

describe('DossierViewComponent', () => {
  let component: DossierViewComponent;
  let fixture: ComponentFixture<DossierViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DossierViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
