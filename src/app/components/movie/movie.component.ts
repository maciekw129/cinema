import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { Screenings } from 'src/types';

@Component({
  selector: 'app-movie[screenings]',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() screenings!: Screenings;
  user$$ = this.userService.user$$;

  constructor(private userService: UserService,
              private router: Router,){}

  handleClick(screeningId: number) {
    this.router.navigate(['/book-tickets', screeningId]);
  }
}
