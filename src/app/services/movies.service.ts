import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import Movie from './movies.interface';
import movies from '../../assets/mockData/movies.json';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  data: Movie[] = movies.movies;
  
  constructor(private http: HttpClient) {}

  getMovies (): Observable<Movie[]> {
    return of(this.data)
  }
}
