import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlashcardResponse } from '../ai-responses';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.css'
})
export class FlashcardsComponent {
  @Input() flashcards: FlashcardResponse[] | null = null;
}
