import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import getNextFiveDays from '../../../utils/getNextFiveDays';
import Movies from '../../services/movies.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonBarElements: string[] = getNextFiveDays();
  movies: Movies[] | null = null;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(response => {
      this.movies = response
    })
  }

  catchValue(value: string) {
    console.log(value);
  }
}
