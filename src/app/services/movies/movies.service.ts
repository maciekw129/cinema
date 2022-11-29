import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Movie from './movies.interface';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies(date: string) {
    return this.http.get<Movie[]>(`http://localhost:3000/movies?day=` + (date));
  }
}
