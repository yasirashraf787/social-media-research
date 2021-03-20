import { TestBed } from '@angular/core/testing';

import { FBServicesService } from './fbservices.service';

describe('FBServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FBServicesService = TestBed.get(FBServicesService);
    expect(service).toBeTruthy();
  });
});
