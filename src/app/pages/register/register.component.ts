import { Component } from '@angular/core';
import { RegisterForm } from 'src/app/forms/register-form/register-form.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error = '';
  isSuccess = false;

  constructor(private userService: UserService) {}

  handleRegister(values: RegisterForm) {
    this.userService.register(values).subscribe({
      next: () => this.isSuccess = true,
      error: (result) => this.error = result.error
    })
  }
}
