import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/domains/order/order.interface';

@Component({
  selector: 'app-order[order]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  @Input() order!: Order;
  private router = inject(Router);

  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');

  navigateToTicket() {
    this.router.navigate(['/ticket', this.order.id]);
  }
}
