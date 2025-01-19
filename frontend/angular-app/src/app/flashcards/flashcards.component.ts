import { Component, OnInit } from '@angular/core';

interface Flashcard {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' }
  ];
  currentCardIndex: number = 0;
  isFlipped: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  nextCard(): void {
    this.isFlipped = false;
    this.currentCardIndex = (this.currentCardIndex + 1) % this.flashcards.length;
  }

  previousCard(): void {
    this.isFlipped = false;
    this.currentCardIndex = (this.currentCardIndex - 1 + this.flashcards.length) % this.flashcards.length;
  }
}