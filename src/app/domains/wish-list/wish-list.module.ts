import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListComponent } from './wish-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WishListComponent,
  },
];

@NgModule({
  declarations: [WishListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WishListModule {}
