import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Add this import
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TextSummaryComponent } from './text-summary/text-summary.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TextSummaryComponent,
    FlashcardsComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule, // Add this line
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }