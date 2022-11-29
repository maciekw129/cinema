import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { User, UserService } from 'src/app/services/user/user.service';
import getNextFiveDays from '../../../utils/getNextFiveDays';
import Movies from '../../services/movies/movies.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonBarElements: string[] = getNextFiveDays();
  movies: Movies[] = [];
  isLogged: boolean = false;
  user: User | {} = {};

  constructor(private movieService: MoviesService, private userService: UserService) {}

  ngOnInit(): void {
    this.movieService.getMovies('1').subscribe(response => {
      this.movies = response;
    })

    this.userService.user$$.subscribe((value) => {
      this.user = value;
    })
  }

  catchValue(value: {date: string, index: number}) {
    this.movieService.getMovies(String(value.index)).subscribe((response) => {
      this.movies = response;
    });
  }
}
