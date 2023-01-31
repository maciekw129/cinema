import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchedUser, Movie, Order, User } from 'src/types';

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
      .get<FetchedUser>(`http://localhost:3000/users/${userId}`)
      .pipe(tap((result) => this._userData$$.next({ user: result })));
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
}
