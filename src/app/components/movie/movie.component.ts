import { Component, Input, OnInit } from '@angular/core';
import { Screenings } from 'src/app/services/movies/movies.interface';
import { User, UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() screenings!: Screenings;
  user: User[] = [];

  constructor(private userService: UserService,
              private router: Router,){}

  ngOnInit() {
    this.userService.user$$.subscribe
  }

  handleClick(screeningId: number) {
    this.router.navigate(['/reservation', screeningId]);
  }
}
