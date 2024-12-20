import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import CommonModule and ReactiveFormsModule
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const messages = JSON.parse(localStorage.getItem('messages') || '[]');
      messages.push(this.contactForm.value);
      localStorage.setItem('messages', JSON.stringify(messages));
      console.log('Form submitted successfully!', this.contactForm.value);
      this.contactForm.reset();
    } else {
      console.log('Form is invalid!');
    }
  }
}
