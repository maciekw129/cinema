import { Component, EventEmitter, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating-scale',
  templateUrl: './rating-scale.component.html',
  styleUrls: ['./rating-scale.component.css']
})
export class RatingScaleComponent {
  @Output() setRateEvent = new EventEmitter<number>();
  star = faStar;
  rateScale = 5;
  rate = 0;

  handleChangeRate(rate: number) {
    this.rate = rate;
    this.setRateEvent.emit(rate);
  }
}
