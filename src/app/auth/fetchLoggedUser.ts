import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { TokenService } from './token.service';
import { AuthActions } from './store/auth.actions';

export function fetchLoggedUser() {
  const tokenService = inject(TokenService);
  const store = inject<Store<AppState>>(Store);

  const { token, decodedToken } = tokenService;

  if (token) {
    if (!tokenService.isTokenExpired() && decodedToken!.sub) {
      store.dispatch(AuthActions.getUser({ userId: +decodedToken!.sub }));
    } else if (tokenService.isTokenExpired()) {
      tokenService.removeToken();
    }
  }
}
