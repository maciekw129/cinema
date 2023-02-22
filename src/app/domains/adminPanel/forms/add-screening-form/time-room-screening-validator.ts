import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { catchError, delay, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { AddScreeningForm } from '../../admin-panel.interface';
import { AdminPanelService } from '../../admin-panel.service';

@Injectable({
  providedIn: 'root',
})
export class TimeRoomScreeningValidator implements AsyncValidator {
  private adminPanelService = inject(AdminPanelService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const form = control as FormGroup<AddScreeningForm>;
    return of(EMPTY).pipe(
      delay(1000),
      switchMap(() => {
        return this.adminPanelService
          .checkIfIsAnotherScreeningInRoom(form.getRawValue())
          .pipe(
            map((isExisting) => (isExisting ? null : { isExisting: true })),
            catchError(() => of(null))
          );
      })
    );
  }
}
