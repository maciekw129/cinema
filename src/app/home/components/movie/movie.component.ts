import { Component, inject, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Screenings } from 'src/types';

@Component({
  selector: 'app-movie[screenings]',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Input() screenings!: Screenings;
  userData$$ = this.authService.userData$$;

  handleClick(screeningId: number) {
    this.router.navigate(['/book-tickets', screeningId]);
  }
}
