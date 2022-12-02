import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Screening } from 'src/app/services/movies/movies.interface';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  screening: Screening | null = null;

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.moviesService.getScreening(this.route.snapshot.params["id"]).subscribe(response => {
      console.log(response);
      this.screening = response;
    })
  }

}
