import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { API_URL } from '../../core/env.token';
import { CoreRequestsService } from '../../core/core-requests.service';
import { Order } from '../order/order.interface';

interface TicketTypesObject {
  [key: number]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);
  private coreRequestsService = inject(CoreRequestsService);

  getTicket(orderId: number) {
    return this.http
      .get<Order>(`${this.API_URL}/orders/${orderId}?_expand=screening`)
      .pipe(
        switchMap((order) => {
          return combineLatest([
            of(order),
            this.coreRequestsService.getMovieById(order.screening.movieId),
            this.coreRequestsService.getRoomById(order.screening.roomId),
          ]);
        }),
        map(([order, movie, room]) => {
          order.screening.movie = movie;
          order.screening.room = room;
          return order;
        })
      );
  }

  getTicketTypes() {
    return this.coreRequestsService.getAllTicketTypes().pipe(
      map((result) => {
        return result.reduce<TicketTypesObject>((acc, curr) => {
          return { ...acc, [curr.id]: curr.name };
        }, {} as TicketTypesObject);
      })
    );
  }
}
