import { createActionGroup, props } from '@ngrx/store';
import {
  AuthState,
  LoginApiResponse,
  LoginCredentials,
} from '../auth.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<LoginCredentials>(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'login success': props<LoginApiResponse>(),
  },
});
