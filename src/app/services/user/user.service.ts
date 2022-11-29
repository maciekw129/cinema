import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  userId: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient){
    if(localStorage.getItem("user")) {
      this.getUserDetails(localStorage.getItem("user") as string);
    }
  }

  getUserDetails(userId: string) {
    return this.http.get<User[]>(`http://localhost:3000/users?userId=${userId}`).subscribe({
      next: (response) => this.user$$.next(response),
      error: (error) => console.log(error)
    })
  }

  login(userId: string) {
    this.getUserDetails(userId);
    localStorage.setItem("user", userId);
  }

  logout() {
    localStorage.removeItem("user");
    this.user$$.next([]);
  }
}
