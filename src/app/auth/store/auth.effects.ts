import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';
import { AuthActions, AuthApiActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) => {
        return this.authService.login({ email, password }).pipe(
          map((result) => {
            this.tokenService.saveToken(result.accessToken);
            return AuthApiActions.loginSuccess(result);
          })
        );
      })
    )
  );
}
