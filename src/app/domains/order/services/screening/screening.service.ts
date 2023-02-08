import { HttpClient } from '@angular/common/http';
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
} from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AuthService } from 'src/app/auth/auth.service';
import { API_URL } from 'src/app/env.token';
import { Screening, Screenings } from 'src/types';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private userId: number | null = null;
  private isUserLogged: boolean = false;

  constructor() {
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

  private getRating(value: Screenings[]) {
    return of(value).pipe(
      switchMap((screenings) => {
        const observables: Observable<any>[] = [];
        if (this.isUserLogged) {
          screenings.forEach((screenings) => {
            observables.push(
              this.http.get<[]>(
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
      .pipe(tap((result) => this._screening$$.next(result)));
  }

  getScreenings(date: string) {
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
        })
      );
  }

  addToWantToWatch(movieId: number) {
    return this.http.post<any>(`${this.API_URL}/wantToWatch`, {
      userId: this.userId,
      movieId: movieId,
    });
  }

  removeFromWantToWatch(movieId: number) {
    return this.http.delete(`${this.API_URL}/wantToWatch/${movieId}`);
  }
}
