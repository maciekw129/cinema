import { Component, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../shared/validators';
import patterns from 'src/app/shared/validatorPatterns';

export interface RegisterForm {
  email: string,
  firstName: string,
  password: string
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  @Output() handleSubmitEvent = new EventEmitter<RegisterForm>();
  registerForm = this.createForm();

  constructor(private fb: NonNullableFormBuilder) {}

  get emailCtrl() {
    return this.registerForm.controls.email;
  }

  get firstNameCtrl() {
    return this.registerForm.controls.firstName;
  }

  get passwordCtrl() {
    return this.registerForm.controls.password;
  }

  get confirmPasswordCtrl() {
    return this.registerForm.controls.confirmPassword;
  }

  handleSubmit() {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.invalid) return
    
    const values = this.registerForm.getRawValue();
    this.handleSubmitEvent.emit({
      email: values.email,
      firstName: values.firstName,
      password: values.password
    })
  }

  createForm() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(15),
          Validators.pattern(patterns['email'])
        ]
      }),
      firstName: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(2)
        ]
      }),
      password: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(10)
        ]
      }),
      confirmPassword: this.fb.control('', {
        validators: [
          Validators.required,
        ]
      })
    }, {validators: confirmPasswordValidator});
  }
}
