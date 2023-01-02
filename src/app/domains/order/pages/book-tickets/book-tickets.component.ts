import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css'],
  providers: [OrderService]
})
export class BookTicketsComponent {}
