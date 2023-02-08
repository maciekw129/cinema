import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  LoginApiResponse,
  LoginCredentials,
  RegisterPayload,
  User,
} from '../auth.interface';

export const AuthLoaderActions = createActionGroup({
  source: 'Auth loader',
  events: {
    'set loading': emptyProps(),
    'set error': props<{ error: string }>(),
  },
});

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<LoginCredentials>(),
    'get user': props<{ userId: number }>(),
    logout: emptyProps(),
    register: props<RegisterPayload>(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'login success': props<LoginApiResponse>(),
    'get user success': props<User>(),
    'register success': props<{ successMessage: string }>(),
  },
});
