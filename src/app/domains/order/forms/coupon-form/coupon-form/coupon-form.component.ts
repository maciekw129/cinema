import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CouponValidator } from './coupon-validator';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css'],
})
export class CouponFormComponent {
  @Output() couponEvent = new EventEmitter<string>();

  private fb = inject(NonNullableFormBuilder);
  private couponValidator = inject(CouponValidator);

  couponForm = this.createForm();

  ngOnInit() {
    this.couponForm.controls.coupon.valueChanges.pipe(debounceTime(1000));
  }

  get couponCtrl() {
    return this.couponForm.controls.coupon;
  }

  handleSubmit() {
    this.couponForm.markAllAsTouched();
    if (this.couponForm.invalid) return;

    this.couponEvent.emit(this.couponCtrl.value);
  }

  cancelCoupon() {
    this.couponForm.reset();
  }

  private createForm() {
    return this.fb.group({
      coupon: this.fb.control('', {
        asyncValidators: [
          this.couponValidator.validate.bind(this.couponValidator),
        ],
      }),
    });
  }
}
