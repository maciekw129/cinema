import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AuthActions } from 'src/app/auth/store/auth.actions';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { API_URL } from 'src/app/env.token';
import { Settings } from './pages/settings/settings.interface';

@Injectable()
export class SettingsService {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  private userId: number | null = null;

  constructor() {
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((result) => {
        this.userId = result;
      });
  }

  patchSettings(settings: Settings) {
    return this.http
      .patch(`${this.API_URL}/users/${this.userId}`, {
        firstName: settings.firstName,
        lastName: settings.lastName,
        phone: settings.phone,
      })
      .pipe(
        tap({
          next: () =>
            this.store.dispatch(AuthActions.getUser({ userId: this.userId! })),
        })
      );
  }
}
