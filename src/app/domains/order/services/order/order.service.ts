import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FinalizeForm, Screening, Seat, TicketTypes } from '../../../../../types';
import { ScreeningService } from '../screening/screening.service';
import { AuthService } from '../../../../auth/auth.service';

export interface OrderState {
  seatsChosen: Seat[],
  ticketTypes: TicketTypes[],
  email: string
}

@UntilDestroy()
@Injectable()
export class OrderService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private screeningService = inject(ScreeningService);

  constructor() {
    this.fetchTicketTypes();
    this.fetchScreening();

    this.authService.userData$$
    .pipe(untilDestroyed(this))
    .subscribe(result => {
      if(result.user?.carts[this.screening.id]) {
        this.patchState({ seatsChosen: result.user?.carts[this.screening.id].reservedSeats });
      }
    })
  }

  private _screening!: Screening;

  get screening() {
    return this._screening;
  }

  private _orderState$$ = new BehaviorSubject<OrderState>({
    seatsChosen: [],
    ticketTypes: [],
    email: ''
  });

  public readonly orderState$: Observable<OrderState> = this._orderState$$.asObservable();

  get selectSeatsChosen$() {
    return this.orderState$.pipe(map((state) => state.seatsChosen));
  }

  get selectTicketTypes$() {
    return this.orderState$.pipe(map((state) => state.ticketTypes));
  }

  get selectEmail$() {
    return this.orderState$.pipe(map((state) => state.email));
  }
  
  private patchState(stateSlice: Partial<OrderState>) {
    this._orderState$$.next({
      ...this._orderState$$.value,
      ...stateSlice
    });
  }

  private fetchScreening() {
    this.screeningService.screening$$.subscribe(result => {
      this._screening = result;
    });
  }

  private fetchTicketTypes(){
    this.http.get<TicketTypes[]>('http://localhost:3000/ticketTypes').subscribe(result => {
      this.patchState({ ticketTypes: result })
    })
  }

  toggleSeat(seat: Seat) {
    const seatsChosen = this._orderState$$.value.seatsChosen;

    if(this.findSeatIndex(seat) === -1 && seatsChosen.length < 10) {
      this.addChosenSeat(seat);
    } else {
      this.deleteChosenSeat(seat);
    }
  }

  updateCartSeats(seats: Seat[]) {
    this.patchState({ seatsChosen: seats });
  }

  findSeatIndex(seat: Seat) {
    return this._orderState$$.value.seatsChosen.findIndex(chosen => chosen[0] === seat[0] && chosen[1] === seat[1]);
  }

  addChosenSeat(seat: Seat) {
    if(this.authService.isUserLogged()) {
      this.authService.addToCart(seat, this._screening.id);
    } else {
      this.patchState({ seatsChosen: [...this._orderState$$.value.seatsChosen, seat] });
    }
  }

  deleteChosenSeat(seat: Seat) {
    if(this.authService.isUserLogged()) {
      this.authService.removeFromCart(seat, this._screening.id);
    } else {
      this.patchState({ seatsChosen: this._orderState$$.value.seatsChosen.filter((_, index) => index != this.findSeatIndex(seat))});
    }
  }

  changeSeatType(seat: Seat, seatType: number) {
    const seatsChosen = this._orderState$$.value.seatsChosen
    seatsChosen[this.findSeatIndex(seat)][2] = seatType;
    this.patchState({ seatsChosen: seatsChosen });
  }

  setEmail(email: string) {
    this.patchState({ email: email });
  }

  createOrder(form: FinalizeForm) {
    const orderPost = this.http.post(`http://localhost:3000/orders`, {
      screeningId: this._screening.id,
      seats: this._orderState$$.value.seatsChosen,
      userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : null,
      ownerDetails: form
    })
    const seats = this._screening.seatsOccupied;
    const seatsPost = this.http.patch(`http://localhost:3000/screenings/${this._screening.id}`, {
      seatsOccupied: seats ? [...seats, ...this._orderState$$.value.seatsChosen] : [...this._orderState$$.value.seatsChosen]
    })
    return combineLatest([orderPost, seatsPost])
  }
}
