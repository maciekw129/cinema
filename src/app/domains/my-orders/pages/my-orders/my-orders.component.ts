import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from 'src/types';

@UntilDestroy()
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  private authService = inject(AuthService);
  userOrders: Order[] = []

  ngOnInit(): void {
    this.authService.userData$$
    .pipe(untilDestroyed(this))
    .subscribe(result => {
      if(result.user) {
        this.authService.getUserOrders().subscribe(result => {
          this.userOrders = result;
        })
      }
    })
  }
}
