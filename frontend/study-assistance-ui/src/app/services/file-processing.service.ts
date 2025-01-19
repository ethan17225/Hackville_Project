import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

export type ProcessingFunction = 'summarize' | 'quiz' | 'flashcards';

@Injectable({
  providedIn: 'root'
})
export class FileProcessingService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  processFile(file: File): Observable<any> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const payload = {
          file_name: file.name,
          file_content: text
        };

        this.http.post(`${this.apiUrl}/process_file`, payload)
          .subscribe({
            next: (response) => observer.next(response),
            error: (error) => observer.error(error),
            complete: () => observer.complete()
          });
      };

      reader.onerror = (error) => observer.error(error);

      // Read the file as text
      if (file.name.toLowerCase().endsWith('.pdf')) {
        // For PDF files, we'll need server-side processing
        this.readFileAsBase64(file).then(base64Content => {
          const payload = {
            file_name: file.name,
            file_type: 'pdf',
            file_content: base64Content
          };
          this.http.post(`${this.apiUrl}/process_file`, payload)
            .subscribe({
              next: (response) => observer.next(response),
              error: (error) => observer.error(error),
              complete: () => observer.complete()
            });
        });
      } else {
        // For other text-based files
        reader.readAsText(file);
      }
    });
  }

  private async readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Content = reader.result as string;
        resolve(base64Content.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  processFunction(functionType: ProcessingFunction): Observable<any> {
    return this.http.post(`${this.apiUrl}/process_text`, { 
      function: functionType 
    });
  }
}
