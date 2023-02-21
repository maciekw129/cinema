import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, delay, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { CouponService } from '../../../services/coupon/coupon.service';

@Injectable({
  providedIn: 'root',
})
export class CouponValidator implements AsyncValidator {
  private couponService = inject(CouponService);

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    return of(EMPTY).pipe(
      delay(1000),
      switchMap(() => {
        return this.couponService.checkIfCouponExist(control.value).pipe(
          map((isExisting) => (isExisting ? null : { isExisting: true })),
          catchError(() => of(null))
        );
      })
    );
  };
}
