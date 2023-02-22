import { inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  map,
  Observable,
  ReplaySubject,
  tap,
  switchMap,
  combineLatest,
  of,
  iif,
  BehaviorSubject,
} from 'rxjs';
import { AppState } from 'src/app/app.module';
import { Cart } from 'src/app/domains/cart/cart.interface';
import { API_URL } from 'src/app/core/env.token';
import { Rate } from 'src/app/home/services/rating/rating.service';
import { Loader } from 'src/app/shared/loader/loader';
import { Screening, Screenings } from 'src/app/core/core.interace';

export interface WantToWatch {
  userId: number;
  movieId: number;
  id: number;
}

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ScreeningService extends Loader {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);

  private userId: number | null = null;
  private isUserLogged: boolean = false;

  constructor() {
    super();
    this.store
      .select((state) => state.auth)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.userId = result.id;
        this.isUserLogged = result.isLogged;
      });
  }

  private _screening$$ = new ReplaySubject<Screening>(1);
  public readonly screening$$: Observable<Screening> =
    this._screening$$.asObservable();

  private _screenings$$ = new BehaviorSubject<Screenings[]>([]);
  public readonly screenings$$: Observable<Screenings[]> =
    this._screenings$$.asObservable();

  private getRating(value: Screenings[]) {
    return of(value).pipe(
      switchMap((screenings) => {
        const observables: Observable<WantToWatch[]>[] = [];
        if (this.isUserLogged) {
          screenings.forEach((screenings) => {
            observables.push(
              this.http.get<WantToWatch[]>(
                `${this.API_URL}/wantToWatch?movieId=${screenings.movieId}&userId=${this.userId}`
              )
            );
          });
        }
        return combineLatest([of(screenings), ...observables]);
      }),
      map((screenings) => {
        const [oldScreenings, ...wantToWatch] = screenings;
        oldScreenings.forEach((screening, index) => {
          if (wantToWatch[index].length)
            screening.wantToWatch = wantToWatch[index][0].id;
        });
        return oldScreenings;
      })
    );
  }

  fetchScreening(screeningId: number) {
    return this.http
      .get<Screening>(
        `${this.API_URL}/screenings/${screeningId}?_expand=movie&_expand=room`
      )
      .pipe(
        switchMap((screening) => {
          const carts = this.http.get<Cart[]>(
            `${this.API_URL}/carts?screeningId=${screeningId}`
          );
          return combineLatest([of(screening), carts]);
        }),
        map(([screening, carts]) => {
          carts.forEach((cart) => {
            if (cart.userId !== this.userId) {
              screening.seatsOccupied.push(...cart.reservedSeats);
            }
          });
          return screening;
        }),
        tap((result) => this._screening$$.next(result))
      );
  }

  getScreenings(date: string) {
    this.setLoading();
    return this.http
      .get<Screening[]>(`${this.API_URL}/screenings?day=${date}&_expand=movie`)
      .pipe(
        map((screenings) => {
          const object = screenings.reduce(
            (acc: { [key: string]: Screenings }, curr: Screening) => {
              if (acc.hasOwnProperty(curr.movieId)) {
                acc[curr.movieId].hours = [
                  ...acc[curr.movieId].hours,
                  { hour: curr.hour[0], screeningId: curr.id },
                ];
              } else {
                acc[String(curr.movieId)] = {
                  hours: [{ hour: curr.hour[0], screeningId: curr.id }],
                  movie: curr.movie,
                  movieId: curr.movieId,
                  day: curr.day,
                };
              }
              return acc;
            },
            {}
          );
          return Object.values(object);
        }),
        switchMap((screenings) => {
          return iif(
            () => this.isUserLogged,
            this.getRating(screenings),
            of(screenings)
          );
        }),
        tap({
          next: (result) => {
            this._screenings$$.next(result);
            this.setLoaderStatus({ status: 'success' });
          },
          error: () =>
            this.setLoaderStatus({
              status: 'failed',
              errorMessage: 'Coś poszło nie tak',
            }),
        })
      );
  }

  addToWantToWatch(movieId: number) {
    return this.http.post(`${this.API_URL}/wantToWatch`, {
      userId: this.userId,
      movieId: movieId,
    });
  }

  removeFromWantToWatch(movieId: number) {
    return this.http.delete(`${this.API_URL}/wantToWatch/${movieId}`);
  }

  getMovieRating(movieId: number) {
    return this.http
      .get<Rate[]>(`${this.API_URL}/rating?movieId=${movieId}`)
      .pipe(
        map((result) => {
          if (!result.length) return 0;
          const ratingSum = result.reduce<number>((acc, prev) => {
            return (acc += prev.rate);
          }, 0);
          return Math.round((ratingSum / result.length) * 10) / 10;
        })
      );
  }
}
