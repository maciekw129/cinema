import { Component, inject, OnInit } from '@angular/core';
import { ScreeningService } from '../domains/order/services/screening/screening.service';
import { Screenings } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private screeningService = inject(ScreeningService);

  buttonBarElements: string[] = this.getNextFiveDays();
  screenings: Screenings[] = [];

  ngOnInit(): void {
    this.fetchScreenings('1');
  }

  handleButtonEvent(value: {date: string, id: number}) {
    this.fetchScreenings(String(value.date));
  }

  fetchScreenings(date: string) {
    this.screeningService.getScreenings(date).subscribe(result => {
      this.screenings = result;
    })
  }

  getNextFiveDays() {
    const fiveDaysArray = [];
    for(let i = 0; i < 5; i++) {
        let day = new Date();
        day.setDate(day.getDate() + i);
        fiveDaysArray.push(day.getDate() + '/' + (day.getMonth() + 1))
    }
    return fiveDaysArray;
  }
}
