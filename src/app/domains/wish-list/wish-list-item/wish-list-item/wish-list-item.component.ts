import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/types';

@Component({
  selector: 'app-wish-list-item[movie][wishId]',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css'],
})
export class WishListItemComponent {
  @Output() deleteWish: EventEmitter<number> = new EventEmitter();
  @Input() movie!: Movie;
  @Input() wishId!: number;

  removeFromWishList(wishId: number) {
    this.deleteWish.emit(wishId);
  }
}
