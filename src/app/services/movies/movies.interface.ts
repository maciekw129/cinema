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

export type Seat = [column: number, row: number, seatType?: string];