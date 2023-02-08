export interface AuthState {
  isLogged: boolean;
  accountType: AccountType;
  id: number | null;
  data: Data | null;
  loader: Loader;
}

export interface Data {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
}

export interface LoaderSuccess {
  status: 'success';
  successMessage?: string;
}

export interface LoaderFailed {
  status: 'failed';
  errorMessage: string;
}

export interface LoaderPending {
  status: 'pending';
}

export interface LoaderInitial {
  status: 'initial';
}

type Loader = LoaderSuccess | LoaderFailed | LoaderPending | LoaderInitial;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  accessToken: string;
  user: User;
}

export interface User {
  accountType: AccountType;
  email: string;
  id: number;
  userData: UserData;
}

export interface UserData {
  firstName: string;
  lastName: string;
  phone?: string;
}

export type AccountType = 'user' | 'admin' | null;

export interface RegisterPayload {
  email: string;
  password: string;
  accountType: AccountType;
  userData: UserData;
}
