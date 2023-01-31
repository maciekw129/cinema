import { Component, inject } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/domains/cart/cart.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  film = faFilm;
  cartCounter: number = 0;
  cartItems: Cart[] = [];
  userData$$ = this.authService.userData$$;

  handleLogout() {
    this.authService.logout();
  }
}
