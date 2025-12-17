/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntranetSearchResultComponent } from './intranet-search-result.component';

describe('IntranetSearchResultComponent', () => {
  let component: IntranetSearchResultComponent;
  let fixture: ComponentFixture<IntranetSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntranetSearchResultComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IntranetSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
