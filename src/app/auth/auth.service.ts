import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../core/env.token';
import {
  LoginApiResponse,
  LoginCredentials,
  RegisterPayload,
  User,
} from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  getUser(userId: number) {
    return this.http.get<User>(`${this.API_URL}/users/${userId}`);
  }

  login(loginCredentials: LoginCredentials) {
    return this.http.post<LoginApiResponse>(
      `${this.API_URL}/login`,
      loginCredentials
    );
  }

  register(registerPayload: RegisterPayload) {
    return this.http.post(`${this.API_URL}/users`, registerPayload);
  }
}
