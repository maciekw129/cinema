import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersComponent,
  },
];

@NgModule({
  declarations: [MyOrdersComponent, OrderComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MyOrdersModule {}
