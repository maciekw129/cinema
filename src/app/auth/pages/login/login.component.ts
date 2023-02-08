import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { LoginCredentials } from '../../auth.interface';
import { AuthActions } from '../../store/auth.actions';
import { selectAuthLoader } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private store = inject<Store<AppState>>(Store);

  authLoader$$ = this.store.select(selectAuthLoader);

  handleLogin(values: LoginCredentials) {
    this.store.dispatch(AuthActions.login(values));
  }
}
