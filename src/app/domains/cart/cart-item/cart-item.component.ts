import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../cart.interface';

@Component({
  selector: 'app-cart-item[cartItem]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  private router = inject(Router);
  @Input() cartItem!: Cart;
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');

  handleScreeningNavigate() {
    this.router.navigate(['/book-tickets', this.cartItem.screeningId]);
  }
}
