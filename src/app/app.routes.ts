import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // The homepage route
  },
  {
    path: 'login',
    component: LoginComponent, // Login page route
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent, // Admin dashboard route
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
];
