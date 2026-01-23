/* eslint-disable license-header/header */
import { TestBed } from '@angular/core/testing';

import { CollaboraOnlineService } from './collabora-online.service';

describe('CollaboraOnlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service = TestBed.inject(CollaboraOnlineService);
    expect(service).toBeTruthy();
  });
});
