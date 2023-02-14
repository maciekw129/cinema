import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AuthActions } from 'src/app/auth/store/auth.actions';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { API_URL } from 'src/app/env.token';
import { Loader } from 'src/app/shared/loader/loader';
import { Settings } from './pages/settings/settings.interface';

@Injectable()
export class SettingsService extends Loader {
  private store = inject<Store<AppState>>(Store);
  private API_URL = inject(API_URL);

  private userId: number | null = null;

  constructor() {
    super();
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((result) => {
        this.userId = result;
      });
  }

  patchSettings(settings: Settings) {
    return this.patchWithLoader(
      `${this.API_URL}/users/${this.userId}`,
      { userData: settings },
      'Pomyślnie zmieniłeś ustawienia!'
    ).pipe(
      tap({
        next: () =>
          this.store.dispatch(AuthActions.getUser({ userId: this.userId! })),
      })
    );
  }
}
