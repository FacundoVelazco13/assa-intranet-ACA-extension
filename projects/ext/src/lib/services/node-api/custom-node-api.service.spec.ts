import { TestBed } from '@angular/core/testing';

import { CustomNodeApiService } from './custom-node-api.service';

describe('CustomNodeApiService', () => {
  let service: CustomNodeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomNodeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
