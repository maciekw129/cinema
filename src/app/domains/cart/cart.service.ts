import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Movie, Seat } from 'src/types';
import { Cart } from './cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  private getParticularCart(screeningId: number) {
    return this.http.get<Cart[]>(
      `http://localhost:3000/carts?userId=${this.authService.userId}&screeningId=${screeningId}`
    );
  }

  fetchCart() {
    return this.http
      .get<Cart[]>(
        `http://localhost:3000/carts?userId=${this.authService.userId}&_expand=screening`
      )
      .pipe(
        switchMap((result) => {
          const observables: Observable<Movie>[] = [];
          result.forEach((result) => {
            observables.push(
              this.http.get<Movie>(
                `http://localhost:3000/movies/${result.screening!.movieId}`
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
          return this.http.patch(
            `http://localhost:3000/carts/${result[0].id}`,
            {
              reservedSeats: [...result[0].reservedSeats, seat],
            }
          );
        } else {
          return this.http.post('http://localhost:3000/carts', {
            userId: this.authService.userId,
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
          return this.http.patch(
            `http://localhost:3000/carts/${result[0].id}`,
            {
              reservedSeats: filteredSeats,
            }
          );
        } else {
          return this.http.delete(
            `http://localhost:3000/carts/${result[0].id}`
          );
        }
      })
    );
  }
}
