import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { User, UserService } from 'src/app/services/user/user.service';
import getNextFiveDays from '../../../utils/getNextFiveDays';
import { Screenings } from '../../services/movies/movies.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonBarElements: string[] = getNextFiveDays();
  screenings: Screenings[] = [];
  user: User | {} = {};

  constructor(private moviesService: MoviesService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchScreenings('1');
    this.userService.user$$.subscribe;
  }

  handleButtonEvent(value: {date: string, id: number}) {
    this.fetchScreenings(String(value.date));
  }

  fetchScreenings(date: string) {
    this.moviesService.getScreenings(date).subscribe(result => {
      console.log(result)
      this.screenings = result;
    })
  }
}
