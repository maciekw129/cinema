import { createReducer, on } from '@ngrx/store';
import { CartApiActions } from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,
  on(CartApiActions.fetchCartSuccess, (state, { cartObject }) => {
    return {
      ...state,
      cart: cartObject,
    };
  }),
  on(CartApiActions.removeScreeningSuccess, (state, { id }) => {
    const filtered = state.cart.filter((value) => value.id !== id);
    return {
      cart: filtered,
    };
  })
);
