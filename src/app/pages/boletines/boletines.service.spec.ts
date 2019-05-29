import { TestBed, inject } from '@angular/core/testing';

import { BoletinesService } from './boletines.service';

describe('BoletinesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoletinesService]
    });
  });

  it('should be created', inject([BoletinesService], (service: BoletinesService) => {
    expect(service).toBeTruthy();
  }));
});