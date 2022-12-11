import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css'],
  providers: [OrderService]
})
export class BookTicketsComponent {
  constructor(private orderService: OrderService,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.orderService.fetchScreening(this.route.snapshot.params["id"]);
  }
}
