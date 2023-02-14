import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Seat } from 'src/types';
import { Cart } from '../cart.interface';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'fetch cart': emptyProps(),
    'remove seat': props<{ seatToDelete: Seat; screeningId: number }>(),
    'remove screening': props<{ id: number }>(),
  },
});

export const CartApiActions = createActionGroup({
  source: 'Cart API',
  events: {
    'fetch cart success': props<{ cartObject: Cart[] }>(),
    'fetch cart rejected': emptyProps(),
    'remove screening success': props<{ id: number }>(),
    'remove seat success': emptyProps(),
    'remove seat rejected': emptyProps(),
  },
});
