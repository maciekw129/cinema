import { Seat } from '../domains/order/order.interface';

export interface TicketTypes {
  id: string;
  name: string;
  price: number;
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
