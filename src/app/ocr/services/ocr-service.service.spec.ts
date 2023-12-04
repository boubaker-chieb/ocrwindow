/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OcrServiceService } from './ocr-service.service';

describe('Service: OcrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcrServiceService]
    });
  });

  it('should ...', inject([OcrServiceService], (service: OcrServiceService) => {
    expect(service).toBeTruthy();
  }));
});
