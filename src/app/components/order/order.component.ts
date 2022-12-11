import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/types';

@Component({
  selector: 'app-order[order]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order!: Order;

  constructor() { }

  ngOnInit(): void {
    console.log(this.order);
  }

}
