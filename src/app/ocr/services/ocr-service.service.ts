import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OcrTextDto } from '../types';
import { Observable } from 'rxjs';

@Injectable()
export class OcrServiceService {
  constructor(readonly httpClient: HttpClient) {}

  public ScanImage(file: File, language: string) : Observable<OcrTextDto> {
    // Specify the URL and parameters
    const url = 'http://localhost:3000/ocr/scan-image';
    const params = new HttpParams().set('language', language);

    // Create FormData object to store the file
    const formData: FormData = new FormData();

    // Append the file to FormData
    formData.append('file', file, file.name);

    // Make the HTTP POST request
    return this.httpClient.post<OcrTextDto>(url, formData, { params });
  }
}
