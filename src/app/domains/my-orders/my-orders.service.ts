import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, mergeMap, Observable, of, take } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AuthService } from 'src/app/auth/auth.service';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { API_URL } from 'src/app/env.token';
import { Movie, Order } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class MyOrdersService {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private userId: number | null = null;

  constructor() {
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((result) => {
        this.userId = result;
      });
  }

  getUserOrders() {
    return this.http
      .get<Order[]>(
        `${this.API_URL}/orders?userId=${this.userId}&_expand=screening`
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
