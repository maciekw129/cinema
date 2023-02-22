import { Component, inject } from '@angular/core';
import { Movie } from '../../../admin-panel.interface';
import { AdminPanelService } from '../../../admin-panel.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent {
  private adminPanelService = inject(AdminPanelService);

  requestState = this.adminPanelService.requestState$$;

  genres$ = this.adminPanelService.getAllGenres();

  createMovie(movie: Movie) {
    this.adminPanelService.createMovie(movie).subscribe();
  }
}
