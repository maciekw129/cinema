import { Component } from '@angular/core';
import { faCartShopping, faFilm } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartShopping = faCartShopping;
  film = faFilm;
  userData$$ = this.userService.userData$$;

  constructor(private userService: UserService){}

  handleLogout() {
    this.userService.logout();
  }
}
