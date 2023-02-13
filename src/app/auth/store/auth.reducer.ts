import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions, AuthLoaderActions } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthApiActions.loginSuccess, (state, action) => ({
    ...state,
    loader: {
      status: 'success',
    },
    isLogged: true,
    accountType: action.user.accountType,
    id: action.user.id,
    data: {
      firstName: action.user.userData.firstName,
      lastName: action.user.userData.lastName,
      email: action.user.email,
    },
  })),
  on(AuthApiActions.getUserSuccess, (state, action) => ({
    ...state,
    loader: {
      status: 'success',
    },
    isLogged: true,
    accountType: action.accountType,
    id: action.id,
    data: {
      firstName: action.userData.firstName,
      lastName: action.userData.lastName,
      email: action.email,
    },
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLogged: false,
    accountType: 'visitor',
    id: null,
    data: null,
  })),
  on(AuthLoaderActions.setLoading, (state) => ({
    ...state,
    loader: {
      status: 'pending',
    },
  })),
  on(AuthLoaderActions.setError, (state, { error }) => ({
    ...state,
    loader: {
      status: 'failed',
      errorMessage: error,
    },
  })),
  on(AuthApiActions.registerSuccess, (state, { successMessage }) => ({
    ...state,
    loader: {
      status: 'success',
      successMessage: successMessage,
    },
  })),
  on(AuthActions.setVisitor, (state) => ({
    ...state,
    accountType: 'visitor'
  }))
);
