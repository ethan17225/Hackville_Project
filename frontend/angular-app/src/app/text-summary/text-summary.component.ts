import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-summary',
  templateUrl: './text-summary.component.html',
  styleUrls: ['./text-summary.component.css']
})
export class TextSummaryComponent implements OnInit {
  summary: string = 'This is the summary of the text.';
  text: string = 'Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers who build compelling user interfaces with Angular.';
  concepts: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.onTextInput(this.text);
  }

  generateSummary(text: string): string {
    // Simple extractive summarization logic
    const sentences = text.split('. ');
    const summarySentences = sentences.slice(0, Math.min(3, sentences.length));
    return summarySentences.join('. ') + (summarySentences.length < sentences.length ? '...' : '');
  }

  extractConcepts(text: string): string[] {
    // Simple keyword extraction logic
    const words = text.split(' ');
    const uniqueWords = Array.from(new Set(words));
    return uniqueWords.slice(0, Math.min(5, uniqueWords.length));
  }

  onTextInput(text: string): void {
    this.text = text;
    this.summary = this.generateSummary(text);
    this.concepts = this.extractConcepts(text);
  }
}
