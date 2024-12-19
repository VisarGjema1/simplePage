import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router to navigate
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Use AuthService to validate login
      const isValidUser = this.authService.login(email, password);

      if (isValidUser) {
        // Redirect based on user role
        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['/adminDashboard']);
        } else if (role === 'user') {
          this.router.navigate(['']); // Replace 'home' with your main site route
        }
      } else {
        console.log('Invalid credentials!');
        // Optionally, show an error message to the user
      }
    }
  }
}
