import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TextSummaryComponent } from './text-summary/text-summary.component';
import { QuizComponent } from './quiz/quiz.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default route  ( home.html)
    { path: 'text-summary', component: TextSummaryComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'flashcards', component: FlashcardsComponent },
];
