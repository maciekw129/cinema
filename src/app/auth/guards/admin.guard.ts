import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, skip, switchMap } from 'rxjs';
import { AppState } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private store = inject<Store<AppState>>(Store);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store
      .select((store) => store.auth)
      .pipe(
        skip(1),
        switchMap((result) => {
          console.log(result);
          return of(result.isLogged);
        })
      );
  }
}
