import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../env.token';
import {
  FetchedGenre,
  FetchedMovie,
  FetchedRoom,
  Movie,
  RawScreening,
  Room,
  Screening,
} from './admin-panel.interface';
import { Loader } from '../../shared/loader/loader';
import { combineLatest, map, of, switchMap } from 'rxjs';

export interface FetchedScreening {
  id: number;
  movieId: number;
  movie: Movie;
  hour: [string];
  day: string;
  roomId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService extends Loader {
  private API_URL = inject(API_URL);

  createRoom(room: Room) {
    return this.postWithLoader(
      `${this.API_URL}/rooms`,
      room,
      'Pomyślnie dodałeś salę!'
    ).subscribe();
  }

  createScreening(screening: Screening) {
    return this.postWithLoader(
      `${this.API_URL}/screenings`,
      screening,
      'Pomyślnie dodałeś seans!'
    ).subscribe();
  }

  createMovie(movie: Movie) {
    return this.postWithLoader(
      `${this.API_URL}/movies`,
      movie,
      'Pomyślnie dodałeś film!'
    ).subscribe();
  }

  getAllMovies() {
    return this.http.get<FetchedMovie[]>(`${this.API_URL}/movies`);
  }

  getAllRooms() {
    return this.http.get<FetchedRoom[]>(`${this.API_URL}/rooms`);
  }

  getAllGenres() {
    return this.http.get<FetchedGenre[]>(`${this.API_URL}/genres`).pipe(
      map((result) => {
        return result.map((genre) => {
          return genre.name;
        });
      })
    );
  }

  checkIfIsAnotherScreeningInRoom({
    movieId,
    hour,
    day,
    roomId,
  }: RawScreening) {
    const date = new Date(day);
    let mounth = `${date.getMonth() + 1}`;
    if (mounth.length === 1) {
      mounth = '0' + mounth;
    }
    const properDay = date.getDate() + '-' + mounth + '-' + date.getFullYear();
    return combineLatest([
      this.http.get<Movie>(`${this.API_URL}/movies/${movieId}`),
      this.http.get<FetchedScreening[]>(
        `${this.API_URL}/screenings?day=${properDay}&roomId=${roomId}&_expand=movie`
      ),
    ]).pipe(
      switchMap(([movie, screenings]) => {
        const isNotColiding = screenings.some((screening, index) => {
          let [day, mounth, year] = screening.day.split('-');
          let [hours, minutes] = screening.hour[0].split(':');
          let [hoursToInsert, minutesToInsert] = hour.split(':');

          let startDate = new Date(
            +year,
            parseInt(mounth, 10) - 1,
            +day,
            +hours,
            +minutes
          );
          let endDate = new Date(
            startDate.getTime() + screenings[index].movie.duration * 60000
          );
          let startDateToInsert = new Date(
            date.getTime() + (+hoursToInsert * 60 + +minutesToInsert) * 60000
          );
          let endDateToInsert = new Date(
            startDateToInsert.getTime() + movie.duration * 60000
          );

          return endDateToInsert < startDate || startDateToInsert > endDate;
        });
        return of(isNotColiding);
      })
    );
  }
}
