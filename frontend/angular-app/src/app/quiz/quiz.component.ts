import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  selectedAnswer: string = '';
  correctAnswer: string = 'option2';
  result: string = '';

  checkAnswer() {
    if (this.selectedAnswer === this.correctAnswer) {
      this.result = 'Correct!';
    } else {
      this.result = 'Incorrect!';
    }
  }
}
