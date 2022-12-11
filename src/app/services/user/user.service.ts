import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Movie, Order, User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$$ = new BehaviorSubject<User | null>(null);
  public readonly user$$: Observable<User | null> = this._user$$.asObservable();

  constructor(private http: HttpClient, private router: Router){
    const userId = localStorage.getItem("userId");
    if(userId) {
      this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(result => {
        this._user$$.next(result);
      })
    }
  }

  getUserOrders(userId: number) {
    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=${userId}&_expand=screening`)
      .pipe(
        mergeMap(result => {
          const observables: Observable<Movie>[] = [];
          result.forEach(order => {
            observables.push(this.http.get<Movie>(`http://localhost:3000/movies/${order.screening.id}`));
          })
          return combineLatest([of(result), ...observables, ]);
        }
        ),
        map(result => {
          const [orders, ...movies] = result;
          orders.forEach((order, index) => {
            order.screening.movie = movies[index];
          })
          return orders;
          }
      ))
  }

  login(values: {email: string, password: string}) {
    return this.http.post<{accessToken: string, user: User}>(`http://localhost:3000/login`, {
      email: values.email, 
      password: values.password
    })
  }

  saveUser(response: {accessToken: string, user: User}) {
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("userId", String(response.user.id));
    this._user$$.next(response.user);
    this.router.navigate(['']);
  }

  register(values: {email: string, password: string, firstName: string}) {
    return this.http.post("http://localhost:3000/users", {
      email: values.email,
      password: values.password,
      firstName: values.firstName
    })
  }

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    this._user$$.next(null);
  }
}
