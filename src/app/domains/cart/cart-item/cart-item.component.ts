import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/types';

@Component({
  selector: 'app-cart-item[cartItem]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartItem!: Cart;
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');

  constructor(private router: Router) {}

  handleScreeningNavigate() {
    this.router.navigate([ '/book-tickets', this.cartItem.screeningId ]);
  }
}
