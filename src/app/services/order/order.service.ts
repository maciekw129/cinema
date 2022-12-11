import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FinalizeForm, Screening, Seat, TicketTypes } from '../../../types';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _seatsChosen$$ = new BehaviorSubject<Seat[]>([]);
  public readonly seatsChosen$$: Observable<Seat[]> = this._seatsChosen$$.asObservable();
  
  private _screening$$ = new BehaviorSubject<Screening | null>(null);
  public readonly screening$$: Observable<Screening | null> = this._screening$$.asObservable();

  private _ticketTypes$$ = new BehaviorSubject<TicketTypes[]>([]);
  public readonly ticketTypes$$: Observable<TicketTypes[]> = this._ticketTypes$$.asObservable();

  private _email$$ = new BehaviorSubject<string>('');
  public readonly email$$: Observable<string> = this._email$$.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<TicketTypes[]>('http://localhost:3000/ticketTypes').subscribe(result => {
      this._ticketTypes$$.next(result);
    })
  }

  fetchScreening(id: number ) {
    this.http.get<Screening>(`http://localhost:3000/screenings/${id}?_expand=movie&_expand=room`).subscribe(response => {
      this._screening$$.next(response);
    })
  }

  toggleSeat(seat: Seat) {
    const seatsChosen = this._seatsChosen$$.getValue();
    if(this.findSeatIndex(seat) === -1 && seatsChosen.length < 10) {
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

  changeSeatType(seat: Seat, seatType: number) {
    const seatsChosen = this._seatsChosen$$.getValue();
    seatsChosen[this.findSeatIndex(seat)][2] = seatType;
    this._seatsChosen$$.next(seatsChosen);
  }

  createOrder(form: FinalizeForm) {
    return this.http.post<any>(`http://localhost:3000/orders`, {
      screeningId: this._screening$$.getValue()?.id,
      seats: this._seatsChosen$$.getValue(),
      userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : null,
      ownerDetails: form
    })
  }

  setEmail(email: string) {
    this._email$$.next(email);
  }
}
