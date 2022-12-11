export interface User {
  id: number,
  firstName: string,
  email: string,
  lastName: string
}

export interface TicketTypes {
    id: string,
    name: string,
    price: number
}

export interface FinalizeForm {
    firstName: string,
    lastName: string,
    phone?: string,
    email: string
}

export interface Order {
      screening: Screening,
      screeningId: number,
      seats: Seat[],
      userId: number,
      ownerDetails: {
        firstName: string,
        lastName: string,
        phone?: string,
        email: string
      },
      id: number
}

export interface Movie {
  name: string,
  image: string,
  premiere: boolean,
  genre: string[],
  duration: string,
  ageRestrictions: string,
  description: string,
  rating: number
}

export interface Screening {
  movieId: number,
  movie: Movie,
  hour: string[],
  day: number,
  id: number,
  room: {
      columns: number,
      rows: number,
      name: string
  },
  seatsOccupied: Seat[]
}

export interface Screenings {
  movieId: number,
  movie: Movie,
  hours: {
      hour: string,
      screeningId: number
  }[],
  day: number
}

export type Seat = [column: number, row: number, seatTypeId: number];