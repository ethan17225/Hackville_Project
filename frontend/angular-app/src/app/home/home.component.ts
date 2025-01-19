import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showModal = false;
  selectedOption: string | null = null;
  file: File | null = null;

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.file) {
      this.showModal = true;
    } else {
      alert('Please select a file first.');
    }
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  startSummarizing(): void {
    if (this.selectedOption) {
      this.router.navigate([`/${this.selectedOption}`]);
    } else {
      alert('Please select an option first.');
    }
  }
 
}
