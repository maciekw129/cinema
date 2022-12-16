import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from 'src/app/services/user/user.service';
import { Order } from 'src/types';

@UntilDestroy()
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userOrders: Order[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userData$$
    .pipe(untilDestroyed(this))
    .subscribe(result => {
      if(result.user) {
        this.userService.getUserOrders().subscribe(result => {
          this.userOrders = result;
        })
      }
    })
  }
}
