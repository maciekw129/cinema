import { Cart } from './app/domains/cart/cart.interface';

export interface FetchedUser {
  id: number;
  firstName: string;
  email: string;
  lastName: string;
  carts: Cart[];
}

export interface User2 {
  id: number;
  firstName: string;
  email: string;
  lastName: string;
  phone?: string;
}

export interface TicketTypes {
  id: string;
  name: string;
  price: number;
}

export interface FinalizeForm {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
}

export interface FetchedOrder {
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

export interface Movie {
  name: string;
  image: string;
  premiere: boolean;
  genre: string[];
  duration: number;
  ageRestrictions: string;
  description: string;
  rating: number;
  id: number;
}

export interface Screening {
  movieId: number;
  movie: Movie;
  roomId: number;
  hour: string[];
  day: string;
  id: number;
  room: {
    columns: number;
    rows: number;
    name: string;
  };
  seatsOccupied: Seat[];
}

export interface Screenings {
  movieId: number;
  movie: Movie;
  wantToWatch?: number;
  hours: {
    hour: string;
    screeningId: number;
  }[];
  day: string;
}

export type Seat = [column: number, row: number, seatTypeId: number];
