import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UploadFile extends File {
  progress?: number;
  error?: string;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFiles: UploadFile[] = [];
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.add('dragover');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  private handleFiles(files: File[]): void {
    const uploadFiles: UploadFile[] = files.map(file => {
      return Object.assign(file, { progress: 0 });
    });
    this.selectedFiles.push(...uploadFiles);
  }

  uploadFiles(): void {
    // TODO: Implement actual file upload logic
    this.selectedFiles.forEach(file => {
      console.log(`Uploading file: ${file.name}`);
    });
  }
}
