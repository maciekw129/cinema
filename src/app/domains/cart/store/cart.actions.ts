import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart } from '../cart.interface';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'fetch cart': emptyProps(),
  },
});

export const CartApiActions = createActionGroup({
  source: 'Cart API',
  events: {
    'fetch cart success': props<{ cartObject: Cart[] }>(),
  },
});
