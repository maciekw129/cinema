import { JwtPayload } from 'jwt-decode';

export interface AuthState {
  isLogged: boolean;
  accountType: AccountType;
  id: number | null;
  userData: UserData | null;
  token: string | null;
  decodedToken: JwtPayload | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  accessToken: string;
  user: {
    accountType: AccountType;
    email: string;
    id: number;
    userData: UserData;
  };
}

export interface UserData {
  firstName: string;
  lastName: string;
  phone?: string;
}

export type AccountType = 'user' | 'admin' | null;
