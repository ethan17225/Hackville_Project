import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


export type ProcessingFunction = 'summarize' | 'quiz' | 'flashcards';

@Injectable({
  providedIn: 'root'
})
export class FileProcessingService {
  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  processFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData

    return this.http.post(`${this.apiUrl}/process_file`, formData, {
      reportProgress: true,
      observe: 'events', // Observe the progress of the upload
    });
  }

  processFunction(functionType: ProcessingFunction): Observable<any> {
    return this.http.post(`${this.apiUrl}/process_text`, { 
      function: functionType 
    });
  }
}
