import { Component, OnInit } from '@angular/core';
import { faCartShopping, faFilm } from '@fortawesome/free-solid-svg-icons';
import { User, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartShopping = faCartShopping;
  film = faFilm;
  user: User[] = [];
  isDropdownVisible: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.user$$.subscribe(result => {
      this.user = result;
    })
  }

  handleLogout() {
    this.userService.logout();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
