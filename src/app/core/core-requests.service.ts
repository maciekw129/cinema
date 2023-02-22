import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import {
  FetchedGenre,
  FetchedMovie,
  FetchedRoom,
  Room,
} from '../domains/adminPanel/admin-panel.interface';
import { FetchedScreening } from '../domains/adminPanel/admin-panel.service';
import { Movie, TicketTypes } from './core.interace';
import { API_URL } from './env.token';

@Injectable({
  providedIn: 'root',
})
export class CoreRequestsService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);

  getMovieById(id: number) {
    return this.http.get<Movie>(`${this.API_URL}/movies/${id}`);
  }

  getAllMovies() {
    return this.http.get<FetchedMovie[]>(`${this.API_URL}/movies`);
  }

  getRoomById(id: number) {
    return this.http.get<Room>(`${this.API_URL}/rooms/${id}`);
  }

  getAllRooms() {
    return this.http.get<FetchedRoom[]>(`${this.API_URL}/rooms`);
  }

  getScreeningByDayAndRoom(day: string, roomId: string) {
    return this.http.get<FetchedScreening[]>(
      `${this.API_URL}/screenings?day=${day}&roomId=${roomId}&_expand=movie`
    );
  }

  getAllGenres() {
    return this.http.get<FetchedGenre[]>(`${this.API_URL}/genres`);
  }

  getAllTicketTypes() {
    return this.http.get<TicketTypes[]>(`${this.API_URL}/ticketTypes`);
  }
}
