import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../cart.service';
import { CartActions, CartApiActions } from './cart.actions';
import { switchMap, map, catchError, of } from 'rxjs';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  fetchCartEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.fetchCart),
      switchMap(() => {
        return this.cartService.fetchCart().pipe(
          map((cartObject) => {
            return CartApiActions.fetchCartSuccess({ cartObject });
          })
        );
      })
    )
  );

  removeSeatEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeSeat),
      switchMap(({ seatToDelete, screeningId }) => {
        return this.cartService.removeFromCart(seatToDelete, screeningId).pipe(
          map(() => {
            return CartActions.fetchCart();
          }),
          catchError((error) => {
            if (error.status === 500) {
              return of(CartActions.fetchCart());
            } else {
              return of(CartApiActions.removeSeatRejected());
            }
          })
        );
      })
    )
  );

  removeScreeningEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeScreening),
      switchMap(({ id }) => {
        return this.cartService.removeScreeningFromCart(id).pipe(
          map(() => {
            return CartApiActions.removeScreeningSuccess({ id });
          }),
          catchError((error) => {
            if (error.status === 500) {
              return of(CartApiActions.removeScreeningSuccess({ id }));
            } else {
              return of(CartApiActions.fetchCartRejected);
            }
          })
        );
      })
    )
  );
}
