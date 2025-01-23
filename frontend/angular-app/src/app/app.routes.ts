import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TextSummaryComponent } from './text-summary/text-summary.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { QuizComponent } from './quiz/quiz.component';


export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default route  ( home.html)
    { path: 'text-summary', component: TextSummaryComponent },
    { path: 'flashcards', component: FlashcardsComponent },
    { path: 'quiz', component: QuizComponent },
];
