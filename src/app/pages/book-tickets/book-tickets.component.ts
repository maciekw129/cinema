import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { ScreeningService } from 'src/app/services/screening/screening.service';
import { Screening } from 'src/types';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css'],
  providers: [OrderService]
})
export class BookTicketsComponent {
  constructor(private route: ActivatedRoute, private screeningService: ScreeningService){
    this.screeningService.screening$$.subscribe(console.log)
  }
}
