import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SummaryResponse, QAResponse, FlashcardResponse } from '../ai-responses';

@Component({
  selector: 'app-process-result',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './process-result.component.html',
  styleUrls: ['./process-result.component.css']
})
export class ProcessResultComponent {
  @Input() result: SummaryResponse[] | QAResponse[] | FlashcardResponse[] | null = null;
  @Input() type: 'summarize' | 'quiz' | 'flashcards' | null = null;

  i = 0;
}
