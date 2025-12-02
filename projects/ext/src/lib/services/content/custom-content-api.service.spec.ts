import { TestBed } from '@angular/core/testing';

import { CustomContentApiService } from './custom-content-api.service';

describe('CustomContentApiService', () => {
  let service: CustomContentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomContentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
