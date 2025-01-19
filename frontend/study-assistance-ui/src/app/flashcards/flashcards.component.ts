import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlashcardResponse } from '../ai-responses';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent {
  @Input() flashcards: FlashcardResponse[] = [];
  currentIndex: number = 0;
  showAnswer: boolean = false;

  flipCard() {
    this.showAnswer = !this.showAnswer;
  }

  nextCard() {
    if (this.flashcards && this.currentIndex < this.flashcards.length - 1) {
      this.currentIndex++;
      this.showAnswer = false;
    }
  }

  prevCard() {
    if (this.flashcards && this.currentIndex > 0) {
      this.currentIndex--;
      this.showAnswer = false;
    }
  }
}
