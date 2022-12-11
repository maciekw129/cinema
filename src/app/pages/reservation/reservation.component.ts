import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Screening } from 'src/types';

@UntilDestroy()
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  screening: Screening | null = null;
  rows: number[] = [];
  columns: number[] = [];
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  seatsChosen$$ = this.orderService.seatsChosen$$;


  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router) {}

  ngOnInit() {
    this.orderService.screening$$
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if(result !== null) {
          this.screening = result;
          this.rows = Array.from(Array(result.room.rows).keys());
          this.columns = Array.from(Array(result.room.columns).keys());
        }
    })
  }

  navigateToFinalize() {
    this.router.navigate(['../finalize'], { relativeTo:this.route });
  }
}
