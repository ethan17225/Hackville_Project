import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'upload', component: UploadComponent},
    {path: '**', redirectTo: ''}
];
