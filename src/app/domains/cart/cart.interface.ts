import { Screening } from 'src/app/core/core.interace';

export interface CartState {
  cart: Cart[];
}

export interface Cart {
  id: number;
  userId: number;
  screeningId: number;
  screening?: Screening;
  reservedSeats: [number, number, number][];
}
