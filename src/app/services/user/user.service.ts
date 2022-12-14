import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, mergeMap, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cart, FetchedUser, Movie, Order, Seat, User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userData$$ = new BehaviorSubject<{user: User | null}>({user: null});
  public readonly userData$$: Observable<{user: User | null}> = this._userData$$.asObservable();

  private beh$$!: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router){
    //

    this.beh$$ = new BehaviorSubject(7);

    const userId = localStorage.getItem("userId");
    if(userId) {
      this.getUserData(+userId).subscribe(result => {
        this._userData$$.next({user: result})
      });
    }
  }

  get userId() {
    return this._userData$$.getValue().user?.id;
  }

  login(values: {email: string, password: string}) {
    return this.http.post<{accessToken: string, user: User}>(`http://localhost:3000/login`, {
      email: values.email, 
      password: values.password
    })
  }

  getUserData(userId: number) {
    return this.http.get<FetchedUser>(`http://localhost:3000/users/${userId}/?_embed=carts`)
    .pipe(
      map(result => {
        const cartsObject = result.carts.reduce((acc: {[key: number]: Cart}, curr: Cart) => {
          acc[curr.screeningId] = curr;
          return acc
        }, {})
        return {
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          id: result.id,
          carts: cartsObject
        }
      })
    );
  }

  saveUser(response: {accessToken: string, user: User}) {
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("userId", String(response.user.id));

    this.getUserData(response.user.id).subscribe(result => {
      this._userData$$.next({user: result});
      this.router.navigate(['']);
    })
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
    this._userData$$.next({user: null});
    this.router.navigate(['']);
  }

  isUserLogged() {
    return !!this.userId;
  }

  getUserOrders() {
    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=${this.userId}&_expand=screening`)
      .pipe(
        mergeMap(result => {
          const observables: Observable<Movie>[] = [];
          result.forEach(order => {
            observables.push(this.http.get<Movie>(`http://localhost:3000/movies/${order.screening.id}`));
          })
          return combineLatest([of(result), ...observables]);
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

  getParticularCart(screeningId: number) {
    return this.http.get<Cart[]>(`http://localhost:3000/carts?userId=${this.userId}&screeningId=${screeningId}`)
  }

  addToCart(seat: Seat, screeningId: number) {
    const subscription = () => {
      this.getUserData(this.userId!).subscribe(result => {
        this._userData$$.next({user: result})
      })
    }

    this.getParticularCart(screeningId).subscribe(result => {
      if(result.length) {
        this.http.patch(`http://localhost:3000/carts/${result[0].id}`, {
          reservedSeats: [...result[0].reservedSeats, seat]
        }).subscribe(subscription)
      } else {
        this.http.post('http://localhost:3000/carts', {
          userId: this.userId,
          screeningId: screeningId,
          reservedSeats: [seat]
        }).subscribe(subscription)
    }})
  }

  removeFromCart(seatToDelete: Seat, screeningId: number) {
    this.getParticularCart(screeningId).subscribe(result => {
      const filteredSeats = result[0].reservedSeats.filter(seat => {
        return (seat[0] != seatToDelete[0]) || (seat[1] != seatToDelete[1])
      })
      this.http.patch(`http://localhost:3000/carts/${result[0].id}`, {
        reservedSeats: filteredSeats
      }).subscribe(() => {
        this.getUserData(this.userId!).subscribe(result => {
          this._userData$$.next({user: result})
        })
      })
    })
  }
}
