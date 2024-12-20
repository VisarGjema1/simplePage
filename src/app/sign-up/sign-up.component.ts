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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { username, email, password, confirmPassword } =
        this.signUpForm.value;

      if (password !== confirmPassword) {
        console.log('Passwords do not match!');
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
}
