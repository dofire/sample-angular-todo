import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MainComponent } from './features/main/main.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: '**', redirectTo: 'login' },
];
