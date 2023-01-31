import { Pipe, PipeTransform } from '@angular/core';
import { Cart } from './cart.interface';

@Pipe({
  name: 'countCartItems',
})
export class CountCartItemsPipe implements PipeTransform {
  transform(value: Cart[]): number {
    return value.reduce((acc, curr) => {
      return acc + curr.reservedSeats.length;
    }, 0);
  }
}
