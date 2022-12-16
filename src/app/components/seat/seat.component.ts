import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderService } from 'src/app/services/order/order.service';
import { Seat } from 'src/types';

@UntilDestroy()
@Component({
  selector: 'app-seat[seat]',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  @Input() seat!: Seat;
  @Input() seatsOccupied: Seat[] = [];
  @Output() clickSeatEvent = new EventEmitter<Seat>();
  seatsChosen: Seat[] = [];
  isSeatOccupied = false;
  isSeatChosen = false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.isSeatOccupied = this.seatsOccupied.some(seat => seat[0] === this.seat[0] && seat[1] === this.seat[1]);

    this.orderService.seatsChosen$$
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        this.seatsChosen = result;
        this.isSeatChosen = this.orderService.findSeatIndex(this.seat) !== -1;
    });
  }

  handleClickSeat() {
    this.clickSeatEvent.emit(this.seat);
  }  
}