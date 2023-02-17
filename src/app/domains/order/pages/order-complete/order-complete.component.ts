import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css'],
})
export class OrderCompleteComponent {
  private orderService = inject(OrderService);
  private router = inject(Router);

  BARCODE_API_URL = 'https://barcodeapi.org/api/qr/';

  order$ = this.orderService.selectOrder$;

  navigateToTicket(id: number) {
    this.router.navigate(['/ticket', id]);
  }
}
