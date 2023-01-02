import { Component, Input } from '@angular/core';
import { Order } from 'src/types';

@Component({
  selector: 'app-order[order]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() order!: Order;
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
}
