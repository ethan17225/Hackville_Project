import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UploadComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  scrollToUpload() {
    document.querySelector('.upload-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
