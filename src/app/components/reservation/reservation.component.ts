import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Screening, Seat } from 'src/app/services/movies/movies.interface';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [OrderService]
})
export class ReservationComponent implements OnInit {
  screening: Screening | null = null;
  rows: number[] = [];
  columns: number[] = [];
  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  seatsChosen: Seat[] = [];


  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router) {}

  ngOnInit() {
    this.moviesService.getScreening(this.route.snapshot.params["id"]).subscribe(response => {
      this.screening = response;
      this.rows = Array.from(Array(response.room.rows).keys());
      this.columns = Array.from(Array(response.room.columns).keys());
    });

    this.orderService.seatsChosen$$.subscribe(result => {
      this.seatsChosen = result;
    })
  }

  navigateToFinalize() {
    console.log('sadas')
    this.router.navigate(['finalize'], {relativeTo:this.route});
  }
}
