import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetaExpandMenuComponentComponent } from './meta-expand-menu.component';

describe('MetaExpandMenuComponentComponent', () => {
  let component: MetaExpandMenuComponentComponent;
  let fixture: ComponentFixture<MetaExpandMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaExpandMenuComponentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MetaExpandMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
