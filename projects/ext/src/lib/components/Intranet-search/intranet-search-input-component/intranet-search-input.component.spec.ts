/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntranetSearchInputComponent } from './intranet-search-input.component';

describe('IntranetSearchInputComponentComponent', () => {
  let component: IntranetSearchInputComponent;
  let fixture: ComponentFixture<IntranetSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntranetSearchInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IntranetSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
