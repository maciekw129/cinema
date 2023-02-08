import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';
import {
  FinalizeForm,
  Screening,
  Seat,
  TicketTypes,
} from '../../../../../types';
import { ScreeningService } from '../screening/screening.service';
import { AuthService } from '../../../../auth/auth.service';
import { CartService } from 'src/app/domains/cart/cart.service';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';
import { CartActions } from 'src/app/domains/cart/store/cart.actions';
import { API_URL } from 'src/app/env.token';
import { selectIsUserLogged } from 'src/app/auth/store/auth.selectors';

export interface OrderState {
  seatsChosen: Seat[];
  ticketTypes: TicketTypes[];
  email: string;
}

@UntilDestroy()
@Injectable()
export class OrderService {
  private API_URL = inject(API_URL);
  private store = inject<Store<AppState>>(Store);
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  private screeningService = inject(ScreeningService);

  constructor() {
    this.fetchTicketTypes();
    this.fetchScreening();

    this.store
      .select(selectIsUserLogged)
      .pipe(take(1))
      .subscribe((result) => {
        this.isUserLogged = result;
      });

    this.getSeatsChosenFromCart()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result[0])
          this.patchState({ seatsChosen: result[0].reservedSeats });
      });
  }

  private isUserLogged: boolean = false;
  private _screening!: Screening;

  get screening() {
    return this._screening;
  }

  private _orderState$$ = new BehaviorSubject<OrderState>({
    seatsChosen: [],
    ticketTypes: [],
    email: '',
  });

  public readonly orderState$: Observable<OrderState> =
    this._orderState$$.asObservable();

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
      ...stateSlice,
    });
  }

  private fetchScreening() {
    this.screeningService.screening$$.subscribe((result) => {
      this._screening = result;
    });
  }

  private fetchTicketTypes() {
    this.http
      .get<TicketTypes[]>(`${this.API_URL}/ticketTypes`)
      .subscribe((result) => {
        this.patchState({ ticketTypes: result });
      });
  }

  private getSeatsChosenFromCart() {
    return this.store
      .select((state) => state.cart.cart)
      .pipe(
        map((result) => {
          return result.filter((cartItem) => {
            return cartItem.screeningId === this.screening.id;
          });
        })
      );
  }

  private findSeatIndex(seat: Seat) {
    return this._orderState$$.value.seatsChosen.findIndex(
      (chosen) => chosen[0] === seat[0] && chosen[1] === seat[1]
    );
  }

  private addChosenSeat(seat: Seat) {
    if (this.isUserLogged) {
      this.cartService.addToCart(seat, this._screening.id).subscribe(() => {
        this.store.dispatch(CartActions.fetchCart());
      });
    } else {
      this.patchState({
        seatsChosen: [...this._orderState$$.value.seatsChosen, seat],
      });
    }
  }

  toggleSeat(seat: Seat) {
    const seatsChosen = this._orderState$$.value.seatsChosen;

    if (this.findSeatIndex(seat) === -1 && seatsChosen.length < 10) {
      return this.addChosenSeat(seat);
    } else {
      return this.deleteChosenSeat(seat);
    }
  }

  deleteChosenSeat(seat: Seat) {
    if (this.isUserLogged) {
      this.cartService
        .removeFromCart(seat, this._screening.id)
        .subscribe(() => {
          this.store.dispatch(CartActions.fetchCart());
        });
    } else {
      this.patchState({
        seatsChosen: this._orderState$$.value.seatsChosen.filter(
          (_, index) => index != this.findSeatIndex(seat)
        ),
      });
    }
  }

  changeSeatType(seat: Seat, seatType: number) {
    const seatsChosen = this._orderState$$.value.seatsChosen;
    seatsChosen[this.findSeatIndex(seat)][2] = seatType;
    this.patchState({ seatsChosen: seatsChosen });
  }

  setEmail(email: string) {
    this.patchState({ email: email });
  }

  createOrder(form: FinalizeForm) {
    const orderPost = this.http.post(`${this.API_URL}/orders`, {
      screeningId: this._screening.id,
      seats: this._orderState$$.value.seatsChosen,
      userId: localStorage.getItem('userId')
        ? localStorage.getItem('userId')
        : null,
      ownerDetails: form,
    });
    const seats = this._screening.seatsOccupied;
    const seatsPost = this.http.patch(
      `${this.API_URL}/screenings/${this._screening.id}`,
      {
        seatsOccupied: seats
          ? [...seats, ...this._orderState$$.value.seatsChosen]
          : [...this._orderState$$.value.seatsChosen],
      }
    );
    return combineLatest([orderPost, seatsPost]);
  }
}
