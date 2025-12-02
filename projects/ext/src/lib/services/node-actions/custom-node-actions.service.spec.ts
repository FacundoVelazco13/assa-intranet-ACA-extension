import { TestBed } from '@angular/core/testing';

import { CustomNodeActionsService } from './custom-node-actions.service';

describe('CustomNodeActionsService', () => {
  let service: CustomNodeActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomNodeActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
