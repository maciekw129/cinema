import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { API_URL } from 'src/app/env.token';
import { Movie } from 'src/types';

interface wantToWatch {
  id: number;
  movie: Movie;
}

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  private userId: number | null = null;

  constructor() {
    this.store
      .select(selectUserId)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.userId = result;
      });
  }

  getWishList() {
    return this.http.get<wantToWatch[]>(
      `${this.API_URL}/wantToWatch?userId=${this.userId}&_expand=movie`
    );
  }
}
