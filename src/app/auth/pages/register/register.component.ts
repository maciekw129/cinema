import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { RegisterPayload } from '../../auth.interface';
import { AuthActions } from '../../store/auth.actions';
import { selectAuthLoader } from '../../store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private store = inject<Store<AppState>>(Store);

  authLoader$$ = this.store.select(selectAuthLoader);

  handleRegister(values: RegisterPayload) {
    this.store.dispatch(AuthActions.register(values));
  }
}
