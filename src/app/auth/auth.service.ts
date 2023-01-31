import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchedUser, User } from 'src/types';
import { API_URL } from '../env.token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);
  private router = inject(Router);

  private _userData$$ = new BehaviorSubject<{ user: User | null }>({
    user: null,
  });
  public readonly userData$$: Observable<{ user: User | null }> =
    this._userData$$.asObservable();

  constructor() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getUserData(+userId).subscribe();
    }
  }

  get userId() {
    return localStorage.getItem('userId') !== null
      ? +localStorage.getItem('userId')!
      : null;
  }

  login(values: { email: string; password: string }) {
    return this.http.post<{ accessToken: string; user: User }>(
      `${this.API_URL}/login`,
      {
        email: values.email,
        password: values.password,
      }
    );
  }

  getUserData(userId: number) {
    return this.http
      .get<FetchedUser>(`${this.API_URL}/users/${userId}`)
      .pipe(tap((result) => this._userData$$.next({ user: result })));
  }

  saveUser(response: { accessToken: string; user: User }) {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('userId', String(response.user.id));

    this.getUserData(response.user.id).subscribe((result) => {
      this.router.navigate(['']);
    });
  }

  register(values: { email: string; password: string; firstName: string }) {
    return this.http.post(`${this.API_URL}/users`, {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
    });
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this._userData$$.next({ user: null });
    this.router.navigate(['']);
  }

  isUserLogged() {
    return !!this.userId;
  }
}
