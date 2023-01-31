import { Component, inject } from '@angular/core';
import { MyOrdersService } from '../../my-orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  private myOrdersService = inject(MyOrdersService);

  userOrders = this.myOrdersService.getUserOrders();
}
