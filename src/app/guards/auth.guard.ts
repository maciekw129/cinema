import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { UserService } from '../services/user/user.service';

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
