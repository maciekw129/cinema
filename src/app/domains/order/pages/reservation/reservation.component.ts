import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { Seat } from 'src/types';
import { of, tap } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationComponent {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private router = inject(Router);

  seatsChosen$ = this.orderService.selectSeatsChosen$;
  screening$ = of(this.orderService.screening).pipe(
    tap(result => {
      this.rows = Array.from(Array(result.room.rows).keys());
      this.columns = Array.from(Array(result.room.columns).keys());
    })
  )
  rows: number[] = [];
  columns: number[] = [];
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');

  toggleSeat(seat: Seat) {
      this.orderService.toggleSeat(seat);
  }

  navigateToFinalize() {
    this.router.navigate(['../finalize'], { relativeTo: this.route });
  }
}
