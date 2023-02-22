import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { API_URL } from 'src/app/core/env.token';
import { Movie, Seat } from 'src/types';
import { Cart } from './cart.interface';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  private userId: number | null = null;

  constructor() {
    this.store
      .select(selectUserId)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.userId = result;
      });
  }

  private getParticularCart(screeningId: number) {
    return this.http.get<Cart[]>(
      `${this.API_URL}/carts?userId=${this.userId}&screeningId=${screeningId}`
    );
  }

  fetchCart() {
    return this.http
      .get<Cart[]>(
        `${this.API_URL}/carts?userId=${this.userId}&_expand=screening`
      )
      .pipe(
        switchMap((result) => {
          const observables: Observable<Movie>[] = [];
          result.forEach((result) => {
            observables.push(
              this.http.get<Movie>(
                `${this.API_URL}/movies/${result.screening!.movieId}`
              )
            );
          });
          return combineLatest([of(result), ...observables]);
        }),
        map((result) => {
          const [carts, ...movies] = result;
          carts.forEach((cart, index) => {
            cart.screening!.movie = movies[index];
          });
          return carts;
        })
      );
  }

  addToCart(seat: Seat, screeningId: number) {
    return this.getParticularCart(screeningId).pipe(
      switchMap((result) => {
        if (result.length) {
          return this.http.patch(`${this.API_URL}/carts/${result[0].id}`, {
            reservedSeats: [...result[0].reservedSeats, seat],
          });
        } else {
          return this.http.post(`${this.API_URL}/carts`, {
            userId: this.userId,
            screeningId: screeningId,
            reservedSeats: [seat],
          });
        }
      })
    );
  }

  removeFromCart(seatToDelete: Seat, screeningId: number) {
    return this.getParticularCart(screeningId).pipe(
      switchMap((result) => {
        const filteredSeats = result[0].reservedSeats.filter((seat) => {
          return seat[0] != seatToDelete[0] || seat[1] != seatToDelete[1];
        });
        if (filteredSeats.length) {
          return this.http.patch(`${this.API_URL}/carts/${result[0].id}`, {
            reservedSeats: filteredSeats,
          });
        } else {
          return this.http.delete(`${this.API_URL}/carts/${result[0].id}`);
        }
      })
    );
  }

  removeScreeningFromCart(id: number) {
    return this.http.delete(`${this.API_URL}/carts/${id}`);
  }
}
