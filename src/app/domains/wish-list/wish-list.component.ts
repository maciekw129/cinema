import { Component, inject } from '@angular/core';
import { WishListService } from './wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent {
  private wishListService = inject(WishListService);

  wishList$ = this.wishListService.getWishList();
}
