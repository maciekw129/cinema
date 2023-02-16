import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  buttonBarElements: string[] = this.getNextFiveDays();
  isRatingModalVisible = false;

  day = this.route.snapshot.params;

  getNextFiveDays() {
    return [...Array(5)].map((_, index) => {
      let day = new Date();
      day.setDate(day.getDate() + index);
      let mounth = `${day.getMonth() + 1}`;
      if (mounth.length === 1) {
        mounth = '0' + mounth;
      }
      return day.getDate() + '-' + mounth + '-' + day.getFullYear();
    });
  }

  navigateToDate(date: string) {
    this.router.navigate(['/', date]);
  }
}
