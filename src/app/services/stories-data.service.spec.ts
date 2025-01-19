import { TestBed } from '@angular/core/testing';

import { StoriesDataService } from './stories-data.service';

describe('StoriesDataService', () => {
  let service: StoriesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoriesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
