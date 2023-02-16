import { Component, Output, EventEmitter, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent {
  @Output() paymentEvent = new EventEmitter<{}>();
  private fb = inject(NonNullableFormBuilder);

  paymentForm = this.fb.group({
    blikNumber: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ],
    }),
  });

  handleSubmit() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid) return;

    this.paymentEvent.emit({});
  }
}
