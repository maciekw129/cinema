import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Screenings } from 'src/types';
import { RatingService } from '../../services/rating/rating.service';
import { tap } from 'rxjs';
import { ScreeningService } from 'src/app/domains/order/services/screening/screening.service';

@Component({
  selector: 'app-movie[screenings]',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [RatingService],
})
export class MovieComponent {
  private authService = inject(AuthService);
  private ratingService = inject(RatingService);
  private router = inject(Router);
  private screeningService = inject(ScreeningService);

  @Output() refreshEvent = new EventEmitter<null>();
  @Input() screenings!: Screenings;
  userData$$ = this.authService.userData$$.pipe(
    tap((userData) => {
      if (userData.user)
        this.ratingService.fetchRating(this.screenings.movieId);
    })
  );
  ratingState$ = this.ratingService.ratingState$;
  isRatingModalVisible = false;

  handleClick(screeningId: number) {
    this.router.navigate(['/book-tickets', screeningId]);
  }

  handleRate() {
    this.ratingService.submitRating().subscribe({
      next: () => (this.isRatingModalVisible = false),
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
    this.screeningService
      .addToWantToWatch(this.screenings.movieId)
      .subscribe(() => {
        this.refreshEvent.emit();
      });
  }

  handleRemoveFromWatch() {
    this.screeningService
      .removeFromWantToWatch(this.screenings.wantToWatch!)
      .subscribe(() => {
        this.refreshEvent.emit();
      });
  }
}
