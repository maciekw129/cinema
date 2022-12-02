import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../movies/movies.interface';

interface CartItem {
  movie: Movie,
  hour: string,
  day: string,
  seats: [number, number][]
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart$$ = new BehaviorSubject<CartItem[]>([]);
  public readonly cart$$: Observable<CartItem[]> = this._cart$$.asObservable();

  constructor() { }

  addcartItem(cartItem: CartItem) {
    this._cart$$.next([...this._cart$$.value, cartItem]);
  }
}
