import { Component, inject, OnInit } from '@angular/core';
import { ScreeningService } from '../domains/order/services/screening/screening.service';
import { Screenings } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private screeningService = inject(ScreeningService);

  buttonBarElements: string[] = this.getNextFiveDays();
  screenings: Screenings[] = [];
  isRatingModalVisible = false;
  date = '1';

  ngOnInit(): void {
    this.fetchScreenings('1');
  }

  handleChangeDay(value: { date: string; id: number }) {
    this.date = value.date;
    this.fetchScreenings(String(value.date));
  }

  fetchScreenings(date: string) {
    this.screeningService.getScreenings(date).subscribe((result) => {
      this.screenings = result;
    });
  }

  getNextFiveDays() {
    return [...Array(5)].map((_, index) => {
      let day = new Date();
      day.setDate(day.getDate() + index);
      return day.getDate() + '/' + (day.getMonth() + 1);
    });
  }

  refresh() {
    this.fetchScreenings(this.date);
  }
}
