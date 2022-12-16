import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { ScreeningService } from './screening.service';

@Injectable({
  providedIn: 'root'
})
export class ScreeningResolver implements Resolve<boolean> {
  constructor( private screeningService: ScreeningService ){}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.screeningService.getScreening(+route.params["id"]).pipe(tap({
      next: screening => {
        this.screeningService.updateScreening(screening);
      },
      error: () => {
        //redirect?
      }
    }));
  }
}
