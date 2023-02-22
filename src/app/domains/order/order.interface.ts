import { Screening } from 'src/app/core/core.interace';

export interface Order {
  screening: Screening;
  screeningId: number;
  seats: Seat[];
  userId: number;
  ownerDetails: {
    firstName: string;
    lastName: string;
    phone?: string;
    email: string;
  };
  id: number;
}

export type Seat = [column: number, row: number, seatTypeId: number];
