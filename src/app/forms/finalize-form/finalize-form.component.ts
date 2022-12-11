import { Component, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { confirmEmailValidator } from '../validators';

export interface UserForm {
  firstName: string,
  lastName: string,
  email: string,
  phone?: string
}

@Component({
  selector: 'app-finalize-form',
  templateUrl: './finalize-form.component.html',
  styleUrls: ['./finalize-form.component.css']
})
export class FinalizeFormComponent {
  @Output() userDataEvent = new EventEmitter<UserForm>();
  finalizeForm = this.createForm();

  constructor(private fb: NonNullableFormBuilder,
              private userService: UserService,) {}

  ngOnInit() {
    this.userService.user$$.subscribe(result => {
      if(result) {
        this.finalizeForm.controls['firstName'].setValue(result.firstName);
        this.finalizeForm.controls['lastName'].setValue(result.lastName);
        this.finalizeForm.controls['email'].setValue(result.email);
        this.finalizeForm.controls['confirmEmail'].setValue(result.email);
      }
    })
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
    if(this.finalizeForm.invalid) return;

    const values = this.finalizeForm.getRawValue();

    this.userDataEvent.emit({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone
    })
  }

  createForm() {
    return this.fb.group({
      firstName: this.fb.control('', {
        validators: [
          Validators.maxLength(20),
          Validators.required
        ]
      }),
      lastName: this.fb.control('', {
        validators: [
          Validators.maxLength(20),
          Validators.required
        ]
      }),
      phone: this.fb.control('', {
        validators: [
          Validators.maxLength(12),
        ]
      }),
      email: this.fb.control('', {
        validators: [
          Validators.maxLength(40),
          Validators.required
        ]
      }),
      confirmEmail: this.fb.control('', {
        validators: [
          Validators.maxLength(40),
          Validators.required
        ]
      }),
    }, {validators: confirmEmailValidator})
  }
}
