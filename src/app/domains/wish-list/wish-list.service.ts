import { Injectable, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { API_URL } from 'src/app/env.token';
import { Loader } from 'src/app/shared/loader/loader';
import { Movie } from 'src/types';

interface wantToWatch {
  id: number;
  movie: Movie;
}

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class WishListService extends Loader {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);

  private _wishList$$ = new BehaviorSubject<wantToWatch[]>([]);
  readonly wishList$$ = this._wishList$$.asObservable();

  private userId: number | null = null;

  constructor() {
    super();
    this.store
      .select(selectUserId)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.userId = result;
      });
  }

  getWishList() {
    return this.getWithLoader<wantToWatch[]>(
      `${this.API_URL}/wantToWatch?userId=${this.userId}&_expand=movie`
    ).subscribe((result) => {
      this._wishList$$.next(result);
    });
  }

  removeFromWishList(wishId: number) {
    this.setLoading();
    return this.http.delete(`${this.API_URL}/wantToWatch/${wishId}`);
  }
}
