import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

const confirmEmailValidator: ValidatorFn = (control: AbstractControl) => {
  const email = control.get('email');
  const confirmEmail = control.get('confirmEmail');
  return email?.value === confirmEmail?.value ? null : { isEmailEqual: true };
}

@Component({
  selector: 'app-finalize-form',
  templateUrl: './finalize-form.component.html',
  styleUrls: ['./finalize-form.component.css']
})
export class FinalizeFormComponent {
  finalizeForm = this.createForm();
  paymentForm = this.fb.group({
    blikNumber: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6)
      ]
    })
  })
  isModalVisible = false;

  constructor(private fb: NonNullableFormBuilder,
              private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) { }

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

  toggleModal() {
    console.log(!this.isModalVisible)
    this.isModalVisible = !this.isModalVisible;
  }

  createOrder() {
    this.paymentForm.markAllAsTouched();
    if(this.paymentForm.invalid) return;
    
    const values = this.finalizeForm.value;
    if(values.firstName && values.lastName && values.email) {
      this.orderService.setEmail(values.email);
      this.orderService.createOrder({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email 
      }).subscribe({
        next: () => this.router.navigate(['../order-complete'], { relativeTo:this.route })
      })
    }
  }

  goToPayment() {
    this.finalizeForm.markAllAsTouched();
    if(this.finalizeForm.invalid) return;
    this.toggleModal()
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
          Validators.maxLength(20),
          Validators.required
        ]
      }),
      confirmEmail: this.fb.control('', {
        validators: [
          Validators.maxLength(20),
          Validators.required
        ]
      }),
    }, {validators: confirmEmailValidator})
  }
}
