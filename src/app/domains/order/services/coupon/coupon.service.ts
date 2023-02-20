import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { API_URL } from 'src/app/env.token';
import { Coupon } from '../order/order.service';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);

  checkIfCouponExist(value: string) {
    return this.http
      .get<Coupon[]>(`${this.API_URL}/coupons?code=${value}`)
      .pipe(
        switchMap((result) => {
          return of(!!result.length);
        })
      );
  }
}
