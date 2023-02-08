import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoginGuard implements CanActivate {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.tokenService.isTokenExpired()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
