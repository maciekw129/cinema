import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Seat, TicketTypes } from 'src/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderService } from '../../services/order/order.service';
import { UserForm } from '../../forms/finalize-form/finalize-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  screening = this.orderService.screening;
  seatsChosen: Seat[] = [];
  ticketTypes: {[id: string]: TicketTypes} | null = null;
  isModalVisible = false;
  userData: UserForm | null = null; 

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderService.selectSeatsChosen$
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if(result.length) this.seatsChosen = result
        else this.router.navigate(['../reservation'], { relativeTo: this.route });
      })

    this.orderService.selectTicketTypes$
      .pipe(untilDestroyed(this))
      .pipe(
        map((ticketTypes) => {
          return ticketTypes.reduce((acc: {[key: string]: TicketTypes}, prev: TicketTypes) => {
            acc[prev.id] = prev;
            return acc
          }, {})
        })
    ).subscribe(result => {
      this.ticketTypes = result;
    })
  }

  submitUserData(userData: UserForm) {
    this.userData = userData;
    this.toggleModal();
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  submitPayment() {
    if(this.userData !== null) {
      const values = this.userData;
      this.orderService.createOrder({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email 
      }).subscribe({
        next: () => this.router.navigate(['../order-complete'], { relativeTo: this.route })
      })
    }
  }

  getPriceSum() {
    return this.seatsChosen.reduce((acc, prev) => {
      return acc + this.ticketTypes![prev[2]].price;
    }, 0)
  }
}
