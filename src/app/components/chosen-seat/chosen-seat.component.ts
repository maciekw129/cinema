import { Component, Input, inject } from '@angular/core';
import { Seat } from 'src/types';
import { OrderService } from 'src/app/services/order/order.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chosen-seat[seat]',
  templateUrl: './chosen-seat.component.html',
  styleUrls: ['./chosen-seat.component.css']
})
export class ChosenSeatComponent {
  private orderService = inject(OrderService);
  @Input() seat!: Seat;

  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  ticketTypes$ =  this.orderService.selectTicketTypes$;
  trash = faTrash;

  onSelectType(value: string) {
    this.orderService.changeSeatType(this.seat, Number(value));
  }

  deleteChosenSeat() {
    this.orderService.deleteChosenSeat(this.seat);
  }
}
