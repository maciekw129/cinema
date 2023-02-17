import { Component, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../shared/validators';
import patterns from 'src/app/shared/validatorPatterns';
import { RegisterPayload } from '../../auth.interface';
import { ConfirmPasswordStateMatcher } from '../confirmPasswordStateMatcher';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Output() handleSubmitEvent = new EventEmitter<RegisterPayload>();
  registerForm = this.createForm();

  constructor(private fb: NonNullableFormBuilder) {}

  confirmPasswordMatcher = new ConfirmPasswordStateMatcher();

  get emailCtrl() {
    return this.registerForm.controls.email;
  }

  get firstNameCtrl() {
    return this.registerForm.controls.firstName;
  }

  get lastNameCtrl() {
    return this.registerForm.controls.lastName;
  }

  get passwordCtrl() {
    return this.registerForm.controls.password;
  }

  get confirmPasswordCtrl() {
    return this.registerForm.controls.confirmPassword;
  }

  handleSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const values = this.registerForm.getRawValue();
    this.handleSubmitEvent.emit({
      email: values.email,
      accountType: 'user',
      password: values.password,
      userData: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: '',
      },
    });
  }

  createForm() {
    return this.fb.group(
      {
        email: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.minLength(15),
            Validators.maxLength(50),
            Validators.pattern(patterns['email']),
          ],
        }),
        firstName: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern(patterns['noSpecialLetters']),
          ],
        }),
        lastName: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern(patterns['noSpecialLetters']),
          ],
        }),
        password: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(20),
          ],
        }),
        confirmPassword: this.fb.control('', {
          validators: [Validators.required],
        }),
      },
      { validators: confirmPasswordValidator }
    );
  }
}
