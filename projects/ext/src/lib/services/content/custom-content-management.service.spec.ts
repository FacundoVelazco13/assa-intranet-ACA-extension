/* eslint-disable license-header/header */
import { TestBed } from '@angular/core/testing';

import { CustomContentManagementService } from '../content/custom-content-management.service';

describe('CustomContentManagementService', () => {
  let service: CustomContentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomContentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
