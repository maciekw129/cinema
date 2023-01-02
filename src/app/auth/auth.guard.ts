import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(){
    return of(!!localStorage.getItem("userId")).pipe(
      tap((canActivate) => {
        if(!canActivate) {
          this.router.navigate([''])
        }
      })
    )
  }
}
