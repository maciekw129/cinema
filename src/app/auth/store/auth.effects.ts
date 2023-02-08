import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, switchMap, tap, catchError } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';
import { AuthActions, AuthApiActions, AuthLoaderActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private store = inject<Store<AppState>>(Store);
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(() => this.store.dispatch(AuthLoaderActions.setLoading())),
      switchMap((loginCredentials) => {
        return this.authService.login(loginCredentials).pipe(
          map((result) => {
            this.tokenService.saveToken(result.accessToken);
            this.router.navigate(['/']);
            return AuthApiActions.loginSuccess(result);
          }),
          catchError((error) => {
            console.log(error.error);
            return of(AuthLoaderActions.setError({ error: error.error }));
          })
        );
      })
    )
  );

  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      tap(() => this.store.dispatch(AuthLoaderActions.setLoading())),
      switchMap((registerPayload) => {
        return this.authService.register(registerPayload).pipe(
          map(() => {
            return AuthApiActions.registerSuccess({
              successMessage:
                'Rejestracja pomyślna, możesz się teraz zalogować.',
            });
          }),
          catchError((error) => {
            return of(AuthLoaderActions.setError({ error: error.error }));
          })
        );
      })
    )
  );

  getUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(({ userId }) => {
        return this.authService.getUser(userId).pipe(
          map((result) => {
            return AuthApiActions.getUserSuccess(result);
          })
        );
      })
    )
  );

  logoutEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.tokenService.removeToken())
      ),
    {
      dispatch: false,
    }
  );
}
