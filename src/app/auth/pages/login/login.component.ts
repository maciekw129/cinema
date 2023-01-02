import { Component, inject } from '@angular/core';
import { LoginForm } from 'src/app/auth/forms/login-form/login-form.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService)
  error = '';

  handleLogin(values: LoginForm) {
    this.authService.login(values).subscribe({
      next: (result) => this.authService.saveUser(result),
      error: (result) => this.error = result.error
    })
  }
}