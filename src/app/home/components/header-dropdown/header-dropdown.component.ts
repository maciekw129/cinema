import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-dropdown[firstName]',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.css']
})
export class HeaderDropdownComponent {
  @Output() logoutEvent = new EventEmitter<{}>();
  @Input() firstName!: string;
  isDropdownVisible: boolean = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  handleLogoutClicked() {
    this.logoutEvent.emit({});
  }
}
