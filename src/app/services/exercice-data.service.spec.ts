import { TestBed } from '@angular/core/testing';

import { ExerciceDataService } from './exercice-data.service';

describe('ExerciceDataService', () => {
  let service: ExerciceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
