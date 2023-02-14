import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../env.token';
import {
  FetchedGenre,
  FetchedMovie,
  FetchedRoom,
  Movie,
  Room,
  Screening,
} from './admin-panel.interface';

import { Loader } from '../../shared/loader/loader';
import { map } from 'rxjs';

@Injectable()
export class AdminPanelService extends Loader {
  private API_URL = inject(API_URL);

  createRoom(room: Room) {
    return this.postWithLoader(
      `${this.API_URL}/rooms`,
      room,
      'Pomyślnie dodałeś salę!'
    );
  }

  createScreening(screening: Screening) {
    return this.postWithLoader(
      `${this.API_URL}/screenings`,
      screening,
      'Pomyślnie dodałeś seans!'
    );
  }

  createMovie(movie: Movie) {
    return this.postWithLoader(
      `${this.API_URL}/movies`,
      movie,
      'Pomyślnie dodałeś film!'
    );
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
}
