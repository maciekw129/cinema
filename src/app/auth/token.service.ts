import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string | null = localStorage.getItem('token');
  private decodedToken: JwtPayload | null;

  get token() {
    return this._token;
  }

  constructor() {
    this.decodedToken = this.decodeToken();
  }

  private decodeToken() {
    if (this.token) {
      return jwtDecode<JwtPayload>(this.token);
    } else {
      return null;
    }
  }

  isTokenExpired(): boolean | void {
    const expTime = this.decodedToken?.exp;
    if (expTime) {
      const milisecondsInSeconds = 1000;
      const expDate = new Date(expTime * milisecondsInSeconds);
      return expDate.getTime() - Date.now() < 0;
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
