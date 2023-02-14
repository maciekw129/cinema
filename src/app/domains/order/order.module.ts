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
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    CustomerRoutingModule,
  ],
})
export class OrderModule {}
