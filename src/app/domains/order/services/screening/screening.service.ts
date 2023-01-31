import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
import { AuthService } from 'src/app/auth/auth.service';
import { API_URL } from 'src/app/env.token';
import { Screening, Screenings } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private _screening$$ = new ReplaySubject<Screening>(1);
  public readonly screening$$: Observable<Screening> =
    this._screening$$.asObservable();

  private getRating(value: Screenings[]) {
    return of(value).pipe(
      switchMap((screenings) => {
        const observables: Observable<any>[] = [];
        if (this.authService.isUserLogged()) {
          screenings.forEach((screenings) => {
            observables.push(
              this.http.get<[]>(
                `${this.API_URL}/wantToWatch?movieId=${screenings.movieId}&userId=${this.authService.userId}`
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
            () => this.authService.isUserLogged(),
            this.getRating(screenings),
            of(screenings)
          );
        })
      );
  }

  addToWantToWatch(movieId: number) {
    return this.http.post<any>(`${this.API_URL}/wantToWatch`, {
      userId: this.authService.userId,
      movieId: movieId,
    });
  }

  removeFromWantToWatch(movieId: number) {
    return this.http.delete(`${this.API_URL}/wantToWatch/${movieId}`);
  }
}
