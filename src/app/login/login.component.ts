import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Include CommonModule here
  template: `
    <div class="outer-container">
      <div class="main">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="input-group">
            <div class="input-icon">
              <i class="fa fa-envelope"></i>
            </div>
            <input
              type="email"
              formControlName="email"
              placeholder="Enter your email"
              required
            />
            <div
              *ngIf="
                loginForm.get('email')?.invalid &&
                loginForm.get('email')?.touched
              "
            >
              <small class="error">Valid email is required.</small>
            </div>
          </div>
          <div class="input-group">
            <div class="input-icon">
              <i class="fa fa-lock"></i>
            </div>
            <input
              type="password"
              formControlName="password"
              placeholder="Enter your password"
              required
            />
            <div
              *ngIf="
                loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched
              "
            >
              <small class="error">Password is required.</small>
            </div>
          </div>
          <button type="submit" [disabled]="loginForm.invalid">Login</button>
        </form>
        <div class="haveAccount">
          <p>Don't have an account? <a routerLink="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
    }
  }
}
