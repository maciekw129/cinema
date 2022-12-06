import { Component } from '@angular/core';
import { Validators, NonNullableFormBuilder, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value ? null : { isEqual: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.createForm();
  error = '';
  isSuccess: boolean = false;

  constructor(private fb: NonNullableFormBuilder,
              private userService: UserService) {}

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

  handleRegister() {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.invalid) return

    const values = this.registerForm.value;
    if(values.password && values.email && values.firstName){
      this.userService.register({
        email: values.email,
        password: values.password,
        firstName: values.firstName
      }).subscribe({
        next: () => {
          this.error = '';
          this.isSuccess = true;
        },
        error: (result) => this.error = result.error
      })
    }
  }

  createForm() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(15)
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
