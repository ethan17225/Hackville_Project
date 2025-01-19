import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileProcessingService {
  private apiUrl = 'http://localhost:8000/process_file';

  constructor(private http: HttpClient) {}

  processFile(file: File): Observable<any> {
    return from(file.arrayBuffer()).pipe(
      map(buffer => {
        const payload = {
          file_content: this.arrayBufferToBase64(buffer)
        };
        return payload;
      }),
      switchMap(payload => this.http.post(this.apiUrl, payload))
    );
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
