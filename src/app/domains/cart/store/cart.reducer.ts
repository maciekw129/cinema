import { createReducer, on } from '@ngrx/store';
import { CartApiActions } from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,
  on(CartApiActions.fetchCartSuccess, (state, { cartObject }) => ({
    ...state,
    cart: cartObject,
  }))
);
