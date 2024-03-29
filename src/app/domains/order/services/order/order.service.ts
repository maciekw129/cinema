import { inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { ScreeningService } from '../screening/screening.service';
import { CartService } from 'src/app/domains/cart/cart.service';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';
import { CartActions } from 'src/app/domains/cart/store/cart.actions';
import { API_URL } from 'src/app/core/env.token';
import { Loader } from 'src/app/shared/loader/loader';
import { Screening, TicketTypes } from 'src/app/core/core.interace';
import { FinalizeForm } from '../../forms/finalize-form/finalize-form.interface';
import { Order, Seat } from '../../order.interface';
import { TicketTypesService } from '../ticket-types/ticket-types.service';

export interface OrderState {
  seatsChosen: Seat[];
  ticketTypes: TicketTypes[];
  order: OrderPostResponse | null;
  coupon: Coupon | null;
}

interface OrderPostResponse extends Order {
  id: number;
}

export interface Coupon {
  id: number;
  code: string;
  discount: number;
}

@UntilDestroy()
@Injectable()
export class OrderService extends Loader {
  private API_URL = inject(API_URL);
  private store = inject<Store<AppState>>(Store);
  private cartService = inject(CartService);
  private screeningService = inject(ScreeningService);
  private ticketTypesService = inject(TicketTypesService);

  constructor() {
    super();
    this.fetchTicketTypes();
    this.fetchScreening();

    this.store
      .select((state) => state.auth)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.isUserLogged = result.isLogged;
        this.userId = result.id;
      });

    this.getSeatsChosenFromCart()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result[0]) {
          this._cartId = result[0].id;
          this.patchState({ seatsChosen: result[0].reservedSeats });
        } else {
          this.patchState({ seatsChosen: [] });
        }
      });
  }

  private isUserLogged: boolean = false;
  private userId: number | null = null;
  private _screening!: Screening;
  private _cartId: number | null = null;

  get screening() {
    return this._screening;
  }

  private _orderState$$ = new BehaviorSubject<OrderState>({
    seatsChosen: [],
    ticketTypes: [],
    order: null,
    coupon: null,
  });

  public readonly orderState$: Observable<OrderState> =
    this._orderState$$.asObservable();

  get selectSeatsChosen$() {
    return this.orderState$.pipe(map((state) => state.seatsChosen));
  }

  get selectTicketTypes$() {
    return this.orderState$.pipe(map((state) => state.ticketTypes));
  }

  get selectOrder$() {
    return this.orderState$.pipe(map((state) => state.order));
  }

  get selectCoupon$() {
    return this.orderState$.pipe(map((state) => state.coupon));
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
    this.ticketTypesService.ticketTypes$$.subscribe((result) => {
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
      this.reserveSeat(seat).subscribe(() => {
        this.patchState({
          seatsChosen: [...this._orderState$$.value.seatsChosen, seat],
        });
      });
    }
  }

  private filterSeat(seat: Seat) {
    return this._orderState$$.value.seatsChosen.filter(
      (_, index) => index != this.findSeatIndex(seat)
    );
  }

  private reserveSeat(seat: Seat) {
    return this.http.patch(`${this.API_URL}/screenings/${this._screening.id}`, {
      seatsOccupied: [
        ...this._screening.seatsOccupied,
        ...this._orderState$$.value.seatsChosen,
        seat,
      ],
    });
  }

  private deleteCouponFromDb(couponId: number) {
    return this.http.delete(`${this.API_URL}/coupons/${couponId}`);
  }

  transformTicketTypesToObject() {
    return this.selectTicketTypes$.pipe(
      map((result) => {
        return result.reduce<Record<number, { name: string; price: number }>>(
          (acc, curr) => {
            return {
              ...acc,
              [curr.id]: { name: curr.name, price: curr.price },
            };
          },
          {} as Record<number, { name: string; price: number }>
        );
      })
    );
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
      this.store.dispatch(
        CartActions.removeSeat({
          seatToDelete: seat,
          screeningId: this._screening.id,
        })
      );
    } else {
      this.cancelSeatReservation(seat).subscribe(() => {
        this.patchState({
          seatsChosen: this.filterSeat(seat),
        });
      });
    }
  }

  private cancelSeatReservation(seat: Seat) {
    return this.http.patch(`${this.API_URL}/screenings/${this._screening.id}`, {
      seatsOccupied: [
        ...this._screening.seatsOccupied,
        ...this.filterSeat(seat),
      ],
    });
  }

  changeSeatType(seat: Seat, seatType: number) {
    const seatIndex = this.findSeatIndex(seat);
    const newSeatsChosen = this._orderState$$.value.seatsChosen.map(
      (value, index) => {
        if (index === seatIndex) {
          return [value[0], value[1], seatType] as Seat;
        }
        return value;
      }
    );
    this.patchState({ seatsChosen: newSeatsChosen });
  }

  calculatePrice() {
    return combineLatest([
      this.selectSeatsChosen$,
      this.transformTicketTypesToObject(),
      this.selectCoupon$,
    ]).pipe(
      map(([seats, ticketTypes, coupon]) => {
        const basePrice = seats.reduce<number>((acc, curr) => {
          return acc + +ticketTypes[curr[2]].price;
        }, 0);
        if (coupon?.discount) {
          const finalPrice = basePrice - coupon.discount;
          return finalPrice > 0 ? finalPrice : 0;
        } else {
          return basePrice;
        }
      })
    );
  }

  addCoupon(code: string) {
    this.http
      .get<Coupon[]>(`${this.API_URL}/coupons?code=${code}`)
      .subscribe((result) => {
        this.patchState({ coupon: result[0] });
      });
  }

  removeCoupon() {
    this.patchState({ coupon: null });
  }

  createOrder(form: FinalizeForm) {
    this.setLoading();
    const orderPost = this.http.post<OrderPostResponse>(
      `${this.API_URL}/orders`,
      {
        screeningId: this._screening.id,
        seats: this._orderState$$.value.seatsChosen,
        userId: this.userId,
        ownerDetails: form,
      }
    );
    const seats = this._screening.seatsOccupied;
    const seatsPost = this.http.patch(
      `${this.API_URL}/screenings/${this._screening.id}`,
      {
        seatsOccupied: seats
          ? [...seats, ...this._orderState$$.value.seatsChosen]
          : [...this._orderState$$.value.seatsChosen],
      }
    );

    return combineLatest([orderPost, seatsPost]).pipe(
      tap({
        next: ([postResponse]) => {
          if (this._orderState$$.value.coupon) {
            this.deleteCouponFromDb(
              this._orderState$$.value.coupon.id
            ).subscribe();
          }
          this.setLoaderStatus({ status: 'success', successMessage: '' });
          this.removeCoupon();
          if (this._cartId !== null) {
            this.store.dispatch(
              CartActions.removeScreening({ id: this._cartId })
            );
          }
          this.patchState({ order: postResponse });
        },
        error: (error) =>
          this.setLoaderStatus({
            status: 'failed',
            errorMessage: 'Coś poszło nie tak',
          }),
      })
    );
  }
}
