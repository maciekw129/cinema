import { Component, OnInit } from '@angular/core';
import { ScreeningService } from 'src/app/services/screening/screening.service';
import { Screenings } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonBarElements: string[] = this.getNextFiveDays();
  screenings: Screenings[] = [];

  constructor(private screeningService: ScreeningService) {}

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
