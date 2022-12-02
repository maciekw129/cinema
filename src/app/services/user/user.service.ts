import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  id: number,
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$$ = new BehaviorSubject<User[]>([]);
  public readonly user$$: Observable<User[]> = this._user$$.asObservable();

  constructor(private http: HttpClient, private router: Router){}

  login(values: {email: string, password: string}) {
    return this.http.post<{accessToken: string, user: User}>(`http://localhost:3000/login`, { email: values.email, password: values.password}).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("userId", String(response.user.id));
        this._user$$.next([response.user]);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  logout() {
    localStorage.removeItem("user");
  }
}
