import { Component, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

export interface LoginForm {
  email: string,
  password: string
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() handleSubmitEvent = new EventEmitter<LoginForm>();
  loginForm = this.createForm();

  constructor(private fb: NonNullableFormBuilder) {}

  get emailCtrl() {
    return this.loginForm.controls.email;
  }

  get passwordCtrl() {
    return this.loginForm.controls.password;
  }

  handleSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return;
    this.handleSubmitEvent.emit(this.loginForm.getRawValue());
  }

  private createForm() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [
          Validators.required
        ]
      }),
      password: this.fb.control('', {
        validators: [
          Validators.required
        ]
      })
    });
  }
}
