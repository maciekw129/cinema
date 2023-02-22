import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { combineLatest, Observable, of, tap } from 'rxjs';
import { TicketTypesService } from '../ticket-types/ticket-types.service';
import { ScreeningService } from './screening.service';

@Injectable({
  providedIn: 'root',
})
export class ScreeningResolver implements Resolve<boolean> {
  private screeningService = inject(ScreeningService);
  private ticketTypesService = inject(TicketTypesService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const fetchScreening = this.screeningService.fetchScreening(
      +route.params['id']
    );
    const fetchTicketTypes = this.ticketTypesService.fetchTicketTypes();

    return combineLatest([fetchScreening, fetchTicketTypes]);
  }
}
