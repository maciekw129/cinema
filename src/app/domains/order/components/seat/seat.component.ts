import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { Seat } from '../../order.interface';

@Component({
  selector: 'app-seat[seat]',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent implements OnChanges {
  @Input() seat!: Seat;
  @Input() seatsOccupied: Seat[] = [];
  @Input() seatsChosen: Seat[] = [];
  @Output() clickSeatEvent = new EventEmitter<Seat>();

  isSeatOccupied = false;
  isSeatChosen = false;

  ngOnChanges() {
    this.isSeatOccupied = this.isSeatInArray(this.seatsOccupied);
    this.isSeatChosen = this.isSeatInArray(this.seatsChosen);
  }

  isSeatInArray(seatsArray: Seat[]) {
    return seatsArray.some(
      (seat) => seat[0] === this.seat[0] && seat[1] === this.seat[1]
    );
  }

  handleClickSeat() {
    this.clickSeatEvent.emit(this.seat);
  }
}
