import { Component, Output, EventEmitter, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/auth/auth.service';
import patterns from 'src/app/shared/validatorPatterns';
import { confirmEmailValidator } from 'src/app/shared/validators';

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  newsletter?: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-finalize-form',
  templateUrl: './finalize-form.component.html',
  styleUrls: ['./finalize-form.component.css'],
})
export class FinalizeFormComponent {
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);

  @Output() userDataEvent = new EventEmitter<UserForm>();
  finalizeForm = this.createForm();

  ngOnInit() {
    this.authService.userData$$
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result.user) {
          this.finalizeForm.controls['firstName'].setValue(
            result.user.firstName
          );
          this.finalizeForm.controls['lastName'].setValue(result.user.lastName);
          this.finalizeForm.controls['email'].setValue(result.user.email);
          this.finalizeForm.controls['confirmEmail'].setValue(
            result.user.email
          );
        }
      });
  }

  get firstNameCtrl() {
    return this.finalizeForm.controls.firstName;
  }

  get lastNameCtrl() {
    return this.finalizeForm.controls.lastName;
  }

  get phoneCtrl() {
    return this.finalizeForm.controls.phone;
  }

  get emailCtrl() {
    return this.finalizeForm.controls.email;
  }

  get confirmEmailCtrl() {
    return this.finalizeForm.controls.confirmEmail;
  }

  handleSubmit() {
    this.finalizeForm.markAllAsTouched();
    if (this.finalizeForm.invalid) return;

    const values = this.finalizeForm.getRawValue();

    this.userDataEvent.emit({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    });
  }

  createForm() {
    return this.fb.group(
      {
        firstName: this.fb.control('', {
          validators: [Validators.maxLength(20), Validators.required],
        }),
        lastName: this.fb.control('', {
          validators: [Validators.maxLength(20), Validators.required],
        }),
        phone: this.fb.control('', {
          validators: [
            Validators.maxLength(12),
            Validators.minLength(9),
            Validators.pattern(patterns.phone),
          ],
        }),
        email: this.fb.control('', {
          validators: [
            Validators.maxLength(40),
            Validators.required,
            Validators.pattern(patterns.email),
          ],
        }),
        confirmEmail: this.fb.control('', {
          validators: [Validators.maxLength(40), Validators.required],
        }),
        newsletter: this.fb.control(false),
      },
      { validators: confirmEmailValidator }
    );
  }
}
