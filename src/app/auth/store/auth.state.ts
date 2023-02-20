import { AuthState } from '../auth.interface';

export const initialAuthState: AuthState = {
  isLogged: false,
  id: null,
  accountType: null,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  loader: {
    status: 'initial',
  },
};
