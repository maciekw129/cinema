import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Order } from 'src/types';
import { TicketService } from './ticket.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  imports: [CommonModule, MatCardModule, MatIconModule],
})
export class TicketComponent {
  private route = inject(ActivatedRoute);
  private ticketService = inject(TicketService);

  ticket$: Observable<Order> = EMPTY;
  ticketTypes$ = this.ticketService.getTicketTypes();
  BARCODE_API_URL = 'http://barcodeapi.org/api/128/';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ticket$ = this.ticketService.getTicket(params['id']);
    });
  }
}
