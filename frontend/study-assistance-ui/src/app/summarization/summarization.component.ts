import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KeyConcept, SummaryResponse } from '../ai-responses';

@Component({
  selector: 'app-summarization',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './summarization.component.html',
  styleUrl: './summarization.component.css'
})
export class SummarizationComponent {
   @Input() summary: SummaryResponse[] | null = null;
    @Input() keyConcepts: KeyConcept[] | null = null;
}
