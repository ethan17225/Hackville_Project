import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4'
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Jupiter'
    }
  ];
  currentQuestionIndex: number = 0;
  selectedOption: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  nextQuestion(): void {
    if (this.selectedOption === this.questions[this.currentQuestionIndex].correctAnswer) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
    this.selectedOption = null;
    this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
  }
}