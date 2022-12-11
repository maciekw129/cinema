import { Component } from '@angular/core';
import { LoginForm } from 'src/app/forms/login-form/login-form.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = '';
  
  constructor(private userService: UserService) {}

  handleLogin(values: LoginForm) {
    this.userService.login(values).subscribe({
      next: (result) => this.userService.saveUser(result),
      error: (result) => this.error = result.error
    })
  }
}