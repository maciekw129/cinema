import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Screening, Seat } from 'src/app/services/movies/movies.interface';
import { TicketTypes } from 'src/app/services/order/order.interface';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {
  screening: Screening | null = null;
  seatsChosen: Seat[] = [];
  ticketTypes: {[id: string]: TicketTypes} | null = null;
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.screening$$.subscribe(result => {
      this.screening = result
    })

    this.orderService.seatsChosen$$.subscribe(result => {
      this.seatsChosen = result;
    })

    this.orderService.ticketTypes$$.pipe(
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

  getPriceSum() {
    return this.seatsChosen.reduce((acc, prev) => {
      return acc + this.ticketTypes![prev[2]].price;
    }, 0)
  }
}
