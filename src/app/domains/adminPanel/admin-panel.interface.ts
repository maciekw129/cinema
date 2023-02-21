import { FormControl } from '@angular/forms';

export interface Room {
  name: string;
  rows: number;
  columns: number;
}

export interface Screening {
  movieId: number;
  hour: string[];
  day: string;
  roomId: number;
  seatsOccupied: [];
}

export interface RawScreening {
  movieId: string;
  hour: string;
  day: string;
  roomId: string;
}

export interface FetchedMovie extends Movie {
  id: number;
}

export interface Movie {
  name: string;
  image: string;
  premiere: boolean;
  genre: Genre[];
  duration: number;
  ageRestrictions: string;
  description: string;
  rating: number;
}

export interface FetchedRoom extends Room {
  id: number;
}

export interface AddScreeningForm {
  movieId: FormControl<string>;
  hour: FormControl<string>;
  day: FormControl<string>;
  roomId: FormControl<string>;
}

export interface AddMovieForm {
  name: FormControl<string>;
  image: FormControl<string>;
  premiere: FormControl<boolean>;
  genre: FormControl<Genre[]>;
  duration: FormControl<number | null>;
  ageRestrictions: FormControl<number | null>;
  description: FormControl<string>;
}

export type Genre =
  | 'dramat'
  | 'thriller'
  | 'kryminał'
  | 'komedia'
  | 'akcja'
  | 'romans';

export interface FetchedGenre {
  id: number;
  name: Genre;
}
