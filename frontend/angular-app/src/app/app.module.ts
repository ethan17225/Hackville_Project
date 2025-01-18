import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TextSummaryComponent } from './text-summary/text-summary.component';
import { QuizComponent } from './quiz/quiz.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TextSummaryComponent,
    QuizComponent,
    FlashcardsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule // Add RouterModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }