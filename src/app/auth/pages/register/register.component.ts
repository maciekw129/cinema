import { Component, inject } from '@angular/core';
import { RegisterForm } from 'src/app/auth/forms/register-form/register-form.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authService = inject(AuthService)
  error = '';
  isSuccess = false;

  handleRegister(values: RegisterForm) {
    this.authService.register(values).subscribe({
      next: () => this.isSuccess = true,
      error: (result) => this.error = result.error
    })
  }
}
