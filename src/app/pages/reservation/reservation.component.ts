import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Screening, Seat } from 'src/app/services/movies/movies.interface';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { OrderService } from 'src/app/services/order/order.service';

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
  seatsChosen: Seat[] = [];


  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router) {}

  ngOnInit() {
    this.orderService.screening$$.subscribe(result => {
        if(result !== null) {
          this.screening = result;
          this.rows = Array.from(Array(result.room.rows).keys());
          this.columns = Array.from(Array(result.room.columns).keys());
        }
    })

    this.orderService.seatsChosen$$.subscribe(result => {
      this.seatsChosen = result;
    })
  }

  navigateToFinalize() {
    this.router.navigate(['../finalize'], { relativeTo:this.route });
  }
}
