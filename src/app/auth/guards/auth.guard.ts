import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private tokenService = inject(TokenService);
  private router = inject(Router);

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenService.isTokenExpired()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
