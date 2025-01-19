import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QAResponse } from '../ai-responses';

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css']
})
export class QAComponent {
  @Input() QAs: QAResponse[] = [];
  userAnswers: { [key: number]: string } = {};
  score: number = 0;
  showResults: boolean = false;

  selectAnswer(questionIndex: number, answer: string) {
    if (!this.userAnswers.hasOwnProperty(questionIndex)) {
      this.userAnswers[questionIndex] = answer;
      if (Object.keys(this.userAnswers).length === this.QAs.length) {
        this.submitAnswers();
      }
    }
  }

  submitAnswers() {
    this.score = 0;
    this.QAs.forEach((qa, index) => {
      if (this.userAnswers[index] === qa.correct_answer) {
        this.score++;
      }
    });
    this.showResults = true;
    setTimeout(() => {
      this.showResults = false;
    }, 5000);
  }

  getResultMessage() {
    if (this.score > 8) {
      return { message: 'Excellent!', color: 'green' };
    } else if (this.score >= 5) {
      return { message: 'Good Job!', color: 'yellow' };
    } else {
      return { message: 'Better Luck Next Time!', color: 'red' };
    }
  }
}
