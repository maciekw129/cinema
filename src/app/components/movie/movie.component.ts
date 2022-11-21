import { Component, OnInit, Input } from '@angular/core';
import Movie from 'src/app/services/movies.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;

  ngOnInit(): void {
  }

  getInformations() {
    return this.movie.genre.join(' | ') + ' | ' + this.movie.duration + ' | ' + this.movie.ageRestrictions;
  }

}
