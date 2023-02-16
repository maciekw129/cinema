import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { API_URL } from 'src/app/env.token';
import { Movie, Order, TicketTypes } from 'src/types';
import { Room } from '../adminPanel/admin-panel.interface';

interface TicketTypesObject {
  [key: number]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);

  getTicket(orderId: number) {
    return this.http
      .get<Order>(`${this.API_URL}/orders/${orderId}?_expand=screening`)
      .pipe(
        switchMap((order) => {
          const movieRequest = this.http.get<Movie>(
            `${this.API_URL}/movies/${order.screening.movieId}`
          );
          const roomRequest = this.http.get<Room>(
            `${this.API_URL}/rooms/${order.screening.roomId}`
          );
          return combineLatest([of(order), movieRequest, roomRequest]);
        }),
        map(([order, movie, room]) => {
          order.screening.movie = movie;
          order.screening.room = room;
          return order;
        })
      );
  }

  getTicketTypes() {
    return this.http.get<TicketTypes[]>(`${this.API_URL}/ticketTypes`).pipe(
      map((result) => {
        return result.reduce<TicketTypesObject>((acc, curr) => {
          return { ...acc, [curr.id]: curr.name };
        }, {} as TicketTypesObject);
      })
    );
  }
}
