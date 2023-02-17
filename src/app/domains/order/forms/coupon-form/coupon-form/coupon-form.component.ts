import { Component, forwardRef, inject } from '@angular/core';
import {
  NG_ASYNC_VALIDATORS,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CouponValidator } from './coupon-validator';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css'],
})
export class CouponFormComponent {
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
    console.log(this.couponForm.getRawValue());
  }

  private createForm() {
    return this.fb.group({
      coupon: this.fb.control('', {
        validators: [Validators.required],
        asyncValidators: [
          this.couponValidator.validate.bind(this.couponValidator),
        ],
      }),
    });
  }
}
