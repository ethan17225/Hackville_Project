import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileProcessingService, ProcessingFunction } from '../services/file-processing.service';
import { KeyConcept } from '../ai-responses';
import { SummarizationComponent } from "../summarization/summarization.component";
import { QAComponent } from "../qa/qa.component";
import { FlashcardsComponent } from "../flashcards/flashcards.component";

interface UploadFile extends File {
  progress?: number;
  error?: string;
  result?: any;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, SummarizationComponent, QAComponent, FlashcardsComponent],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFiles: UploadFile[] = [];
  isUploading = false;
  isFileUploaded = false;
  isProcessing = false;
  selectedFunction: ProcessingFunction | null = null;
  processedResult: any = null;
  keyConcepts: KeyConcept[] = [];
  selectedOption: string | null = null;

  constructor(private fileProcessingService: FileProcessingService) {}

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
    const validFiles = files.filter(file => {
      const extension = file.name.toLowerCase();
      if (!extension.endsWith('.pdf') && !extension.endsWith('.docx')) {
        console.error('Invalid file type:', file.name);
        return false;
      }
      return true;
    });

    const uploadFiles: UploadFile[] = validFiles.map(file => {
      return Object.assign(file, { progress: 0 });
    });
    this.selectedFiles.push(...uploadFiles);
  }

  uploadFiles(): void {
    if (this.isUploading) return;
    this.isUploading = true;

    this.selectedFiles.forEach(file => {
      file.progress = 0;
      file.error = undefined;

      this.fileProcessingService.processFile(file).subscribe({
        next: (result) => {
          file.progress = 100;
          file.result = result;
          console.log('Processing result:', result);
          this.isFileUploaded = true;
          setTimeout(() => {
            this.isFileUploaded = true;
          }, 1000);
          this.isUploading = false;
        },
        error: (error) => {
          file.error = 'Processing failed';
          file.progress = 0;
          this.isUploading = false;
          console.error('Processing error:', error);
        },
        complete: () => {
          this.isUploading = false;
        }
      });
    });
  }

  processFunction(functionType: ProcessingFunction): void {
    this.isProcessing = true;
    this.selectedFunction = functionType;
    
    this.fileProcessingService.processFunction(functionType).subscribe({
      next: (result) => {

        if (functionType === 'summarize') {
          this.processedResult = result.summary;
          this.keyConcepts = result.key_concepts;
        } else if (functionType === 'quiz') {
          this.processedResult = result.quiz;
        } else if (functionType === 'flashcards') {
          this.processedResult = result.flashcards;
        }
        
        this.isProcessing = false;
      },
      error: (error) => {
        console.error('Processing error:', error);
        this.isProcessing = false;
      }
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  isOptionSelected(option: string): boolean {
    return this.selectedOption === option;
  }
}
