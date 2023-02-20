import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreeningService } from 'src/app/domains/order/services/screening/screening.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  private screeningService = inject(ScreeningService);
  private route = inject(ActivatedRoute);

  screenings$$ = this.screeningService.screenings$$;
  requestState$$ = this.screeningService.requestState$$;

  day = this.route.snapshot.params['date'];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.fetchScreenings(params['date']);
      this.day = params['date'];
    });
  }

  refresh() {
    this.fetchScreenings(this.day);
  }

  fetchScreenings(date: string) {
    this.screeningService.getScreenings(date);
  }

  handleChangeDay(value: { date: string; id: number }) {
    this.fetchScreenings(String(value.date));
  }
}
