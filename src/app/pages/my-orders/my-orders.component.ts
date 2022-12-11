import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Order } from 'src/types';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userOrders: Order[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$$.subscribe(result => {
      if(result) {
        this.userService.getUserOrders(result.id).subscribe(result => {
          this.userOrders = result;
        })
      }
    })
  }
}
