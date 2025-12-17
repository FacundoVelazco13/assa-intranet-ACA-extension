/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTestComponent } from './process-test.component';

describe('ProcessTestComponent', () => {
  let component: ProcessTestComponent;
  let fixture: ComponentFixture<ProcessTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
