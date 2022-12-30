import { Component } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';
import { tap } from 'rxjs';
import { Cart } from 'src/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  film = faFilm;
  cartCounter: number = 0;
  cartItems: Cart[] = []
  userData$$ = this.userService.userData$$.pipe(
    tap(result => {
      if(result.user) {
        this.cartCounter = this.userService.countCartItems();
        this.getUserCarts();
      } 
    })
  )

  constructor(private userService: UserService){}

  getUserCarts() {
    this.userService.getUserCarts().subscribe(result => {
      this.cartItems = result
    })
  }

  handleLogout() {
    this.userService.logout();
  }
}
