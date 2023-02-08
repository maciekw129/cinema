import { Component, inject } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthActions } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private store = inject<Store<AppState>>(Store);
  authState = this.store.select((state) => state.auth);
  film = faFilm;

  handleLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
