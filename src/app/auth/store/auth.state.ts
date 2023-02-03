import { AuthState } from '../auth.interface';

export const initialAuthState: AuthState = {
  isLogged: false,
  id: null,
  accountType: null,
  userData: null,
  token: null,
  decodedToken: null,
};
