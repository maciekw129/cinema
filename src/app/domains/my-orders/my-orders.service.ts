import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, mergeMap, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { API_URL } from 'src/app/env.token';
import { Movie, Order } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class MyOrdersService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getUserOrders() {
    return this.http
      .get<Order[]>(
        `${this.API_URL}/orders?userId=${this.authService.userId}&_expand=screening`
      )
      .pipe(
        mergeMap((result) => {
          const observables: Observable<Movie>[] = [];
          result.forEach((order) => {
            observables.push(
              this.http.get<Movie>(
                `${this.API_URL}/movies/${order.screening.id}`
              )
            );
          });
          return combineLatest([of(result), ...observables]);
        }),
        map((result) => {
          const [orders, ...movies] = result;
          orders.forEach((order, index) => {
            order.screening.movie = movies[index];
          });
          return orders;
        })
      );
  }
}
