import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seat } from '../movies/movies.interface';
import { TicketTypes } from './order.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _seatsChosen$$ = new BehaviorSubject<Seat[]>([]);
  public readonly seatsChosen$$: Observable<Seat[]> = this._seatsChosen$$.asObservable();

  constructor(private http: HttpClient) {}

  getTicketTypes() {
    return this.http.get<TicketTypes[]>('http://localhost:3000/ticketTypes');
  }

  toggleSeat(seat: Seat) {
    const seatsChosen = this._seatsChosen$$.getValue();
    if(this.findSeatIndex(seat) === -1) {
      this._seatsChosen$$.next([...seatsChosen, seat]);
    } else {
      this.deleteChosenSeat(seat);
    }
  }

  findSeatIndex(seat: Seat) {
    return this._seatsChosen$$.getValue().findIndex(chosen => chosen[0] === seat[0] && chosen[1] === seat[1]);
  }

  deleteChosenSeat(seat: Seat) {
    this._seatsChosen$$.next(this._seatsChosen$$.getValue().filter((_, index) => index != this.findSeatIndex(seat)));
  }
}
