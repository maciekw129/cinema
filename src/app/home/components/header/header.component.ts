import { Component, inject } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private store = inject<Store<AppState>>(Store);
  private authService = inject(AuthService);
  film = faFilm;
  userData$$ = this.authService.userData$$;

  handleLogout() {
    this.authService.logout();
  }
}
