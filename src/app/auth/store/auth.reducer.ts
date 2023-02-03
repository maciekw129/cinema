import { createReducer, on } from '@ngrx/store';
import { AuthApiActions } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthApiActions.loginSuccess, (state, action) => ({
    ...state,
    isLogged: true,
    accountType: action.user.accountType,
    id: action.user.id,
    userData: action.user.userData,
    token: action.accessToken,
  }))
);
