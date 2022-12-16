import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { Cart, FinalizeForm, Screening, Seat, TicketTypes } from '../../../types';
import { ScreeningService } from '../screening/screening.service';
import { UserService } from '../user/user.service';


@UntilDestroy()
@Injectable()
export class OrderService {
  private _seatsChosen$$ = new BehaviorSubject<Seat[]>([]);
  public readonly seatsChosen$$: Observable<Seat[]> = this._seatsChosen$$.asObservable();

  private _ticketTypes$$ = new BehaviorSubject<TicketTypes[]>([]);
  public readonly ticketTypes$$: Observable<TicketTypes[]> = this._ticketTypes$$.asObservable();

  private _email$$ = new BehaviorSubject<string>('');
  public readonly email$$: Observable<string> = this._email$$.asObservable();

  private screening!: Screening;

  constructor(private http: HttpClient,
              private userService: UserService, 
              private screeningService: ScreeningService) {
    this.getTicketTypes();
    this.screeningService.screening$$.subscribe(result => {
      this.screening = result;
    });
  }

  getTicketTypes(){
    this.http.get<TicketTypes[]>('http://localhost:3000/ticketTypes').subscribe(result => {
      this._ticketTypes$$.next(result);
    })
  }

  toggleSeat(seat: Seat) {
    const screeningId = this.screening.id;
    const seatsChosen = this._seatsChosen$$.getValue();

    if(this.findSeatIndex(seat) === -1 && seatsChosen.length < 10) {
      if(this.userService.isUserLogged()) {
        this.userService.addToCart(seat, screeningId);
      } else {
        this._seatsChosen$$.next([...seatsChosen, seat]);
      }
    } else {
      if(this.userService.isUserLogged()){
        this.userService.removeFromCart(seat, screeningId);
      } else {
        this.deleteChosenSeat(seat);
      } 
    }
  }

  updateCartSeats(seats: Seat[]) {
    this._seatsChosen$$.next(seats);
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

  setEmail(email: string) {
    this._email$$.next(email);
  }

  createOrder(form: FinalizeForm) {
    const orderPost = this.http.post(`http://localhost:3000/orders`, {
      screeningId: this.screening.id,
      seats: this._seatsChosen$$.getValue(),
      userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : null,
      ownerDetails: form
    })
    const seats = this._screening$$.getValue()?.seatsOccupied
    const seatsPost = this.http.patch(`http://localhost:3000/screenings/${this._screening$$.getValue()?.id}`, {
      seatsOccupied: seats ? [...seats, ...this._seatsChosen$$.getValue()] : [...this._seatsChosen$$.getValue()]
    })
    return combineLatest([orderPost, seatsPost])
  }
}
