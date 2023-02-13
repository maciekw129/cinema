import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountType } from 'src/app/auth/auth.interface';

@Component({
  selector: 'app-header-dropdown[firstName][accountType]',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.css'],
})
export class HeaderDropdownComponent {
  @Output() logoutEvent = new EventEmitter<{}>();
  @Input() firstName!: string;
  @Input() accountType!: AccountType;
  isDropdownVisible: boolean = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  handleLogoutClicked() {
    this.logoutEvent.emit({});
  }
}
