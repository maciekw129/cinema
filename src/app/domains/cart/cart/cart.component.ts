import { Component, inject } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { CartActions } from '../store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  private store = inject<Store<AppState>>(Store);
  cartItems = this.store.select((state) => state.cart.cart);
  cartShopping = faCartShopping;
  isCartVisible = false;

  toggleIsCartVisible() {
    this.isCartVisible = !this.isCartVisible;
  }

  ngOnInit() {
    this.store.dispatch(CartActions.fetchCart());
  }
}
