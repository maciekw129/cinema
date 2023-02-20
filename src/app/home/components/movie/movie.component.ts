import {
  Component,
  inject,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Screenings } from 'src/types';
import { RatingService } from '../../services/rating/rating.service';
import { Observable, tap } from 'rxjs';
import { ScreeningService } from 'src/app/domains/order/services/screening/screening.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { selectIsUserLogged } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-movie[screenings]',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [RatingService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  private store = inject<Store<AppState>>(Store);
  private ratingService = inject(RatingService);
  private router = inject(Router);
  private screeningService = inject(ScreeningService);

  @Output() refreshEvent = new EventEmitter<null>();
  @Input() screenings!: Screenings;

  isUserLogged$$ = this.store.select(selectIsUserLogged).pipe(
    tap((isUserLogged) => {
      if (isUserLogged) this.ratingService.fetchRating(this.screenings.movieId);
    })
  );
  ratingState$ = this.ratingService.ratingState$;
  ratingValue$: Observable<number> | null = null;
  isRatingModalVisible = false;

  ngOnInit() {
    this.ratingValue$ = this.screeningService.getMovieRating(
      this.screenings.movieId
    );
  }

  handleClick(screeningId: number) {
    this.router.navigate(['/book-tickets', screeningId]);
  }

  handleRate() {
    this.ratingService.submitRating().subscribe({
      next: () => {
        this.isRatingModalVisible = false;
        this.refreshEvent.emit();
      },
      error: (error) => console.log(error),
    });
  }

  showRatingModal() {
    this.isRatingModalVisible = true;
  }

  closeRatingModal() {
    this.isRatingModalVisible = false;
  }

  setRate(rate: number) {
    this.ratingService.updateRating(rate);
  }

  handleAddToWatch() {
    this.screeningService.addToWantToWatch(this.screenings.movieId).subscribe({
      next: () => this.refreshEvent.emit(),
      error: (error) => {
        if (error.status === 500) {
          this.refreshEvent.emit();
        }
      },
    });
  }

  handleRemoveFromWatch() {
    this.screeningService
      .removeFromWantToWatch(this.screenings.wantToWatch!)
      .subscribe({
        next: () => this.refreshEvent.emit(),
        error: (error) => {
          if (error.status === 500) {
            this.refreshEvent.emit();
          }
        },
      });
  }
}
