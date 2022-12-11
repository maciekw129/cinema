import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Seat } from 'src/types';
import { OrderService } from 'src/app/services/order/order.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chosen-seat[seat]',
  templateUrl: './chosen-seat.component.html',
  styleUrls: ['./chosen-seat.component.css']
})
export class ChosenSeatComponent {
  @Input() seat!: Seat;
  @Output() deleteReservationEvent = new EventEmitter<[column: number, row: number]>();
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  ticketTypes$$ =  this.orderService.ticketTypes$$;
  trash = faTrash;

  constructor(private orderService: OrderService) {}

  onSelectType(value: string) {
    this.orderService.changeSeatType(this.seat, Number(value));
  }

  deleteChosenSeat() {
    this.orderService.deleteChosenSeat(this.seat);
  }
}
