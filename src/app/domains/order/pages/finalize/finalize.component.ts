import { Component, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { TicketTypes } from 'src/types';
import { OrderService } from '../../services/order/order.service';
import { UserForm } from '../../forms/finalize-form/finalize-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css'],
})
export class FinalizeComponent {
  private orderService = inject(OrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  screening = this.orderService.screening;
  isModalVisible = false;
  userData: UserForm | null = null;

  seatsChosen$ = this.orderService.selectSeatsChosen$.pipe(
    tap((result) => {
      if (!result.length)
        this.router.navigate(['../reservation'], { relativeTo: this.route });
    })
  );

  ticketTypes$ = this.orderService.selectTicketTypes$.pipe(
    map((ticketTypes) => {
      return ticketTypes.reduce(
        (acc: { [key: string]: TicketTypes }, prev: TicketTypes) => {
          acc[prev.id] = prev;
          return acc;
        },
        {}
      );
    })
  );

  submitUserData(userData: UserForm) {
    this.userData = userData;
    this.toggleModal();
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  submitPayment() {
    if (this.userData !== null) {
      const values = this.userData;
      this.orderService
        .createOrder({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
        })
        .subscribe({
          next: () =>
            this.router.navigate(['../order-complete'], {
              relativeTo: this.route,
            }),
        });
    }
  }

  // getPriceSum() {
  //   return this.seatsChosen.reduce((acc, prev) => {
  //     return acc + this.ticketTypes![prev[2]].price;
  //   }, 0)
  // }
}
