import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosElementComponentComponent } from './document-element.component';

describe('DocumentosElementComponentComponent', () => {
  let component: DocumentosElementComponentComponent;
  let fixture: ComponentFixture<DocumentosElementComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosElementComponentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentosElementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
