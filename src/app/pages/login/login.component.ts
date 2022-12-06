import { Component } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.createForm();
  error = '';
  
  constructor(private userService: UserService, private fb: NonNullableFormBuilder) {}

  get emailCtrl() {
    return this.loginForm.controls.email;
  }

  get passwordCtrl() {
    return this.loginForm.controls.password;
  }

  handleLogin() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return
    
    if(this.loginForm.value.password != undefined && this.loginForm.value.email != undefined){
      this.userService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe({
        next: (result) => this.userService.saveUser(result),
        error: (result) => this.error = result.error
      })
    }
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
