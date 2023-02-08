import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthState } from '../auth.interface';

export const selectAuth = (state: AppState) => state.auth;

export const selectIsUserLogged = createSelector(
  selectAuth,
  (state: AuthState) => state.isLogged
);

export const selectData = createSelector(
  selectAuth,
  (state: AuthState) => state.data
);

export const selectUserId = createSelector(
  selectAuth,
  (state: AuthState) => state.id
);

export const selectAuthLoader = createSelector(
  selectAuth,
  (state: AuthState) => state.loader
);
