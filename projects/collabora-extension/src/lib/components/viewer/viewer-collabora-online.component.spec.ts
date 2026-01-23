/* eslint-disable license-header/header */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewerCollaboraOnlineComponent } from './viewer-collabora-online.component';

describe('CollaboraComponent', () => {
  let component: ViewerCollaboraOnlineComponent;
  let fixture: ComponentFixture<ViewerCollaboraOnlineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewerCollaboraOnlineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerCollaboraOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
