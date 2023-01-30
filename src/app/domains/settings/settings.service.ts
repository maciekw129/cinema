import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Settings } from './pages/settings/settings.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  patchSettings(settings: Settings) {
    return this.http
      .patch(`http://localhost:3000/users/${this.authService.userId}`, {
        firstName: settings.firstName,
        lastName: settings.lastName,
        phone: settings.phone,
      })
      .pipe(
        tap({
          next: () =>
            this.authService
              .getUserData(this.authService.userId as number)
              .subscribe(),
        })
      );
  }
}
