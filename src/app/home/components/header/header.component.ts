import { Component, inject } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { tap } from 'rxjs';
import { Cart } from 'src/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  film = faFilm;
  cartCounter: number = 0;
  cartItems: Cart[] = []
  userData$$ = this.authService.userData$$.pipe(
    tap(result => {
      if(result.user) {
        this.cartCounter = this.authService.countCartItems();
        this.getUserCarts();
      } 
    })
  )

  getUserCarts() {
    this.authService.getUserCarts().subscribe(result => {
      this.cartItems = result
    })
  }

  handleLogout() {
    this.authService.logout();
  }
}
