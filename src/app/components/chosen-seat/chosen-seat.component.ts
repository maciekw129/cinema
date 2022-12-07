import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TicketTypes } from 'src/app/services/order/order.interface';
import { OrderService } from 'src/app/services/order/order.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Seat } from 'src/app/services/movies/movies.interface';

@Component({
  selector: 'app-chosen-seat',
  templateUrl: './chosen-seat.component.html',
  styleUrls: ['./chosen-seat.component.css']
})
export class ChosenSeatComponent implements OnInit {
  @Input() seat!: Seat;
  @Output() deleteReservationEvent = new EventEmitter<[column: number, row: number]>();
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  ticketTypes: TicketTypes[] = [];
  trash = faTrash;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.ticketTypes$$.subscribe(result => {
      console.log(result)
      this.ticketTypes = result
    });
  }

  onSelectType(value: string) {
    this.orderService.changeSeatType(this.seat, Number(value));
  }

  deleteChosenSeat() {
    this.orderService.deleteChosenSeat(this.seat);
  }
}
