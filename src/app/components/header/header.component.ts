import { Component, OnInit } from '@angular/core';
import { faCartShopping, faFilm } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/types';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartShopping = faCartShopping;
  film = faFilm;
  userData: User | null = null;
  cartCounter: number = 0;

  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.userData$$
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if(result.user) {
          this.userData = result.user;
          this.cartCounter = this.userService.countCartItems();
        }
      })
  }

  handleLogout() {
    this.userService.logout();
  }
}
