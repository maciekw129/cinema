import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string | null = localStorage.getItem('token');
  private _decodedToken: JwtPayload | null;

  get token() {
    return this._token;
  }

  get decodedToken() {
    return this._decodedToken;
  }

  constructor() {
    this._decodedToken = this.decodeToken();
    console.log(this._decodedToken);
  }

  private decodeToken() {
    if (this.token) {
      return jwtDecode<JwtPayload>(this.token);
    } else {
      return null;
    }
  }

  isTokenExpired(): boolean | void {
    if (this.decodedToken) {
      console.log('sadasd');
      const expTime = this.decodedToken.exp;
      if (expTime) {
        const milisecondsInSeconds = 1000;
        const expDate = new Date(expTime * milisecondsInSeconds);
        return expDate.getTime() - Date.now() < 0;
      }
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
