import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CoreRequestsService } from 'src/app/core/core-requests.service';
import { TicketTypes } from 'src/app/core/core.interace';

@Injectable({
  providedIn: 'root',
})
export class TicketTypesService {
  private coreRequestsService = inject(CoreRequestsService);

  private _ticketTypes$$ = new ReplaySubject<TicketTypes[]>(1);
  public readonly ticketTypes$$: Observable<TicketTypes[]> =
    this._ticketTypes$$.asObservable();

  fetchTicketTypes() {
    return this.coreRequestsService.getAllTicketTypes().pipe(
      tap((result) => {
        this._ticketTypes$$.next(result);
      })
    );
  }
}
