import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../cart.service';
import { CartActions, CartApiActions } from './cart.actions';
import { switchMap, map } from 'rxjs';

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
}
