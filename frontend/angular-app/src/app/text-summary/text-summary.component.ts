import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-summary',
  templateUrl: './text-summary.component.html',
  styleUrls: ['./text-summary.component.css']
})
export class TextSummaryComponent implements OnInit {
  summary: string = 'This is the summary of the text.';

  constructor() {}

  ngOnInit(): void {}
}
