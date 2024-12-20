import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_]{3,15}$/), // Alphanumeric with underscores, 3-15 characters
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email, // Built-in email validation
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/), // Ensures proper email format
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Minimum length 8 characters
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ), // At least one uppercase, one lowercase, one digit, and one special character
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('Form submitted'); // Debugging log
    if (this.signUpForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const { username, email, password, confirmPassword } =
      this.signUpForm.value;

    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      this.signUpForm.controls['confirmPassword'].setErrors({
        mismatch: true,
      });
      return;
    }

    this.authService.register(username, email, password).subscribe(
      (response) => {
        if (response.success) {
          console.log(response.message);
          this.router.navigate(['/login']);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Registration failed!', error);
      }
    );
  }
}
