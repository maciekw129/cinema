import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ScreeningService } from './screening.service';

@Injectable({
  providedIn: 'root'
})
export class ScreeningResolver implements Resolve<boolean> {
  private screeningService = inject(ScreeningService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.screeningService.fetchScreening(+route.params["id"]).pipe(tap({
      error: () => {}
    }));
  }
}
