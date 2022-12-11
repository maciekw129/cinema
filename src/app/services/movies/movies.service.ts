import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Screening, Screenings } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getScreenings(date: string) {
    return this.http.get<Screening[]>(`http://localhost:3000/screenings?day=${date}&_expand=movie`)
    .pipe(
      map((screenings) => {
        const object = screenings.reduce((acc: {[key: string]: Screenings} , curr: Screening) => {
          if(acc.hasOwnProperty(curr.movieId)) {
            acc[curr.movieId].hours = [...acc[curr.movieId].hours, { hour: curr.hour[0], screeningId: curr.id }];
          } else {
            acc[String(curr.movieId)] = {
              hours: [{hour: curr.hour[0], screeningId: curr.id}],
              movie: curr.movie,
              movieId: curr.movieId,
              day: curr.day
            };
          }
          return acc;
        }, {})
        return Object.values(object);
      }))
  }

  getScreening(screeningId: number) {
    return this.http.get<Screening>(`http://localhost:3000/screenings/${screeningId}?_expand=movie&_expand=room`);
  }
}