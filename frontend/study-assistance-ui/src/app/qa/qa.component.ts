import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QAResponse } from '../ai-responses';

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [ MatCardModule],
  templateUrl: './qa.component.html',
  styleUrl: './qa.component.css'
})
export class QAComponent {
  @Input() QAs: QAResponse[] | null = null;
  i = 0;
}
