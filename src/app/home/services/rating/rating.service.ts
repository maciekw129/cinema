import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { API_URL } from 'src/app/env.token';

export interface RatingState {
  rating: number;
  hasUserRated: boolean;
  movieId: number | null;
  userId: number | null;
}

export interface Rate {
  rate: number;
  userId: number;
  movieId: number;
}

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  constructor() {
    this.store
      .select(selectUserId)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.patchState({ userId: result });
      });
  }

  private _ratingState$$ = new BehaviorSubject<RatingState>({
    rating: 0,
    hasUserRated: false,
    movieId: null,
    userId: null,
  });

  public readonly ratingState$: Observable<RatingState> =
    this._ratingState$$.asObservable();

  private patchState(stateSlice: Partial<RatingState>) {
    this._ratingState$$.next({
      ...this._ratingState$$.value,
      ...stateSlice,
    });
  }

  fetchRating(movieId: number) {
    this.patchState({ movieId: movieId });
    this.http
      .get<Rate[]>(
        `${this.API_URL}/rating?movieId=${movieId}&userId=${this._ratingState$$.value.userId}`
      )
      .subscribe({
        next: (result) => {
          if (result.length)
            this.patchState({ hasUserRated: true, rating: result[0].rate });
        },
      });
  }

  updateRating(rating: number) {
    this.patchState({ rating: rating });
  }

  submitRating() {
    return this.http
      .post(`${this.API_URL}/rating`, {
        rate: this._ratingState$$.value.rating,
        movieId: this._ratingState$$.value.movieId,
        userId: this._ratingState$$.value.userId,
      })
      .pipe(
        tap({
          next: () => {
            this.patchState({ hasUserRated: true });
          },
        })
      );
  }
}
