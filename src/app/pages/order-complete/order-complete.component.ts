import { Component, inject } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent {
  private orderService = inject(OrderService);
  email = this.orderService.selectEmail$;
}
