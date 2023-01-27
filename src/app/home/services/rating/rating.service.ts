import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, map, tap } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service';

export interface RatingState {
  rating: number,
  hasUserRated: boolean,
  movieId: number | null,
  userId: number | null
}

export interface Rate {
  rate: number,
  userId: number,
  movieId: number
}

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  constructor() {
    this.authService.userData$$
    .pipe(untilDestroyed(this))
    .subscribe(userData => {
      this.patchState({ userId: userData.user?.id })
    })
  }

  private _ratingState$$ = new BehaviorSubject<RatingState>({
    rating: 0,
    hasUserRated: false,
    movieId: null,
    userId: null
  });

  public readonly ratingState$: Observable<RatingState> = this._ratingState$$.asObservable();

  private patchState(stateSlice: Partial<RatingState>) {
    this._ratingState$$.next({
      ...this._ratingState$$.value,
      ...stateSlice
    });
  }

  fetchRating(movieId: number) {
    this.patchState({ movieId: movieId });
    this.http.get<Rate[]>(`http://localhost:3000/rating?movieId=${movieId}&userId=${this._ratingState$$.value.userId}`).subscribe({
      next: (result) => {
        if(result.length) this.patchState({ hasUserRated: true, rating: result[0].rate })
      }
    })
  }

  updateRating(rating: number) {
    this.patchState({ rating: rating });
  }

  submitRating() {
    return this.http.post('http://localhost:3000/rating', {
      rate: this._ratingState$$.value.rating,
      movieId: this._ratingState$$.value.movieId,
      userId: this._ratingState$$.value.userId
    }).pipe(
      tap({
        next: () => {
          this.patchState({ hasUserRated: true })
        }
      }))
    }
}
