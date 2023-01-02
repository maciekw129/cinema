import { AbstractControl, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { isEqual: true };
}

export const confirmEmailValidator: ValidatorFn = (control: AbstractControl) => {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');
    return email?.value === confirmEmail?.value ? null : { isEmailEqual: true };
  }