import { TestBed } from '@angular/core/testing';

import { GuardiaService } from './guardia.service';

describe('GuardiaService', () => {
  let service: GuardiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
