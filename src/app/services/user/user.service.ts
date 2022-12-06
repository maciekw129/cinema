import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  id: number,
  firstName: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$$ = new BehaviorSubject<User[]>([]);
  public readonly user$$: Observable<User[]> = this._user$$.asObservable();

  constructor(private http: HttpClient, private router: Router){
    const userId = localStorage.getItem("userId");
    if(userId) {
      this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(result => {
        this._user$$.next([result]);
      })
    }
  }

  login(values: {email: string, password: string}) {
    return this.http.post<{accessToken: string, user: User}>(`http://localhost:3000/login`, {
      email: values.email, 
      password: values.password
    })
  }

  saveUser(response: {accessToken: string, user: User}) {
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("userId", String(response.user.id));
    this._user$$.next([response.user]);
    this.router.navigate(['']);
  }

  register(values: {email: string, password: string, firstName: string}) {
    return this.http.post<any>("http://localhost:3000/users", {
      email: values.email,
      password: values.password,
      firstName: values.firstName
    })
  }

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    this._user$$.next([]);
  }
}
