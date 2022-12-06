import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/services/movies/movies.interface';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  @Input() seat!: Seat;
  @Input() seatsOccupied: Seat[] = [];
  seatsChosen: Seat[] = [];
  isSeatOccupied = false;
  isSeatChosen = false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.isSeatOccupied = this.seatsOccupied.some(seat => seat[0] === this.seat[0] && seat[1] === this.seat[1]);

    this.orderService.seatsChosen$$.subscribe(result => {
      this.seatsChosen = result;
      this.isSeatChosen = this.orderService.findSeatIndex(this.seat) !== -1;
    });
  }

  chooseSeat() {
    this.orderService.toggleSeat(this.seat);
  }
}