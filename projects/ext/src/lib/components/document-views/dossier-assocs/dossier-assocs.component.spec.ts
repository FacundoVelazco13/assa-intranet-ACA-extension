import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DossierAssocsComponent } from './dossier-assocs.component';

describe('DossierAssocsComponent', () => {
  let component: DossierAssocsComponent;
  let fixture: ComponentFixture<DossierAssocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierAssocsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DossierAssocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
