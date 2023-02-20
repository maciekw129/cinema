import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTicketsComponent } from './pages/book-tickets/book-tickets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FinalizeComponent } from './pages/finalize/finalize.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { SeatComponent } from './components/seat/seat.component';
import { ChosenSeatComponent } from './components/chosen-seat/chosen-seat.component';
import { PaymentFormComponent } from './forms/payment-form/payment-form.component';
import { FinalizeFormComponent } from './forms/finalize-form/finalize-form.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './order-routing.module';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CouponFormComponent } from './forms/coupon-form/coupon-form/coupon-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from 'src/app/shared/loader/loader/loader.component';
import { NoSpacesDirective } from 'src/app/shared/directives/no-spaces.directive';

@NgModule({
  declarations: [
    BookTicketsComponent,
    FinalizeComponent,
    FinalizeFormComponent,
    OrderCompleteComponent,
    ReservationComponent,
    SeatComponent,
    ChosenSeatComponent,
    PaymentFormComponent,
    CouponFormComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    CustomerRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    LoaderComponent,
    NoSpacesDirective,
  ],
})
export class OrderModule {}
