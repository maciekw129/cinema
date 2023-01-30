import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Cart,
  FetchedUser,
  Movie,
  Order,
  Screening,
  Seat,
  User,
} from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData$$ = new BehaviorSubject<{ user: User | null }>({
    user: null,
  });
  public readonly userData$$: Observable<{ user: User | null }> =
    this._userData$$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getUserData(+userId).subscribe();
    }
  }

  get userId() {
    return localStorage.getItem('userId') !== null
      ? +localStorage.getItem('userId')!
      : null;
  }

  login(values: { email: string; password: string }) {
    return this.http.post<{ accessToken: string; user: User }>(
      `http://localhost:3000/login`,
      {
        email: values.email,
        password: values.password,
      }
    );
  }

  getUserData(userId: number) {
    return this.http
      .get<FetchedUser>(`http://localhost:3000/users/${userId}/?_embed=carts`)
      .pipe(
        map((result) => {
          const cartsObject = result.carts.reduce(
            (acc: { [key: number]: Cart }, curr: Cart) => {
              acc[curr.screeningId] = curr;
              return acc;
            },
            {}
          );
          return {
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            id: result.id,
            carts: cartsObject,
          };
        }),
        tap((result) => this._userData$$.next({ user: result }))
      );
  }

  saveUser(response: { accessToken: string; user: User }) {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('userId', String(response.user.id));

    this.getUserData(response.user.id).subscribe((result) => {
      this.router.navigate(['']);
    });
  }

  register(values: { email: string; password: string; firstName: string }) {
    return this.http.post('http://localhost:3000/users', {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
    });
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this._userData$$.next({ user: null });
    this.router.navigate(['']);
  }

  isUserLogged() {
    return !!this.userId;
  }

  getUserOrders() {
    return this.http
      .get<Order[]>(
        `http://localhost:3000/orders?userId=${this.userId}&_expand=screening`
      )
      .pipe(
        mergeMap((result) => {
          const observables: Observable<Movie>[] = [];
          result.forEach((order) => {
            observables.push(
              this.http.get<Movie>(
                `http://localhost:3000/movies/${order.screening.id}`
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

  getParticularCart(screeningId: number) {
    return this.http.get<Cart[]>(
      `http://localhost:3000/carts?userId=${this.userId}&screeningId=${screeningId}`
    );
  }

  addToCart(seat: Seat, screeningId: number) {
    const subscription = () => {
      this.getUserData(+this.userId!).subscribe();
    };

    this.getParticularCart(screeningId).subscribe((result) => {
      if (result.length) {
        this.http
          .patch(`http://localhost:3000/carts/${result[0].id}`, {
            reservedSeats: [...result[0].reservedSeats, seat],
          })
          .subscribe(subscription);
      } else {
        this.http
          .post('http://localhost:3000/carts', {
            userId: this.userId,
            screeningId: screeningId,
            reservedSeats: [seat],
          })
          .subscribe(subscription);
      }
    });
  }

  removeFromCart(seatToDelete: Seat, screeningId: number) {
    this.getParticularCart(screeningId).subscribe((result) => {
      const filteredSeats = result[0].reservedSeats.filter((seat) => {
        return seat[0] != seatToDelete[0] || seat[1] != seatToDelete[1];
      });

      const subscription = () => {
        this.getUserData(+this.userId!).subscribe();
      };

      if (filteredSeats.length) {
        this.http
          .patch(`http://localhost:3000/carts/${result[0].id}`, {
            reservedSeats: filteredSeats,
          })
          .subscribe(subscription);
      } else {
        this.http
          .delete(`http://localhost:3000/carts/${result[0].id}`)
          .subscribe({
            error: subscription,
          });
      }
    });
  }

  getUserCarts() {
    return this.http
      .get<Cart[]>(
        `http://localhost:3000/carts?userId=${this.userId}&_expand=screening`
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

  countCartItems() {
    let counter = 0;
    const carts = this._userData$$.getValue().user?.carts;
    if (carts) {
      Object.keys(carts).forEach((cartItem) => {
        carts[+cartItem].reservedSeats.forEach((_) => counter++);
      });
    }
    return counter;
  }
}
