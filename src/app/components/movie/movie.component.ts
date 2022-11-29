import { Component, Input, OnInit } from '@angular/core';
import Movie from 'src/app/services/movies/movies.interface';
import { User, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;
  user: User[] = []

  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.user$$.subscribe(value => {
      this.user = value;
    })
  }
}
