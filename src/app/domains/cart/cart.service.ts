import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService = inject(AuthService);
}
