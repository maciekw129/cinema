import { Component, Input } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Cart } from 'src/types';

@Component({
  selector: 'app-cart[cartCounter][cartItems]',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() cartCounter!: number;
  @Input() cartItems!: Cart[];
  cartShopping = faCartShopping;
  isCartVisible = false;

  toggleIsCartVisible() {
    this.isCartVisible = !this.isCartVisible;
  }
}