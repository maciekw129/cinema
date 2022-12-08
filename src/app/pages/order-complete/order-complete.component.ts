import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  email: string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.email$$.subscribe(result => {
      this.email = result
    })
  }

}
