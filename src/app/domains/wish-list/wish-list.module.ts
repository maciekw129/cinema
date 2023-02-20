import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListComponent } from './wish-list.component';
import { RouterModule, Routes } from '@angular/router';
import { WishListItemComponent } from './wish-list-item/wish-list-item/wish-list-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from 'src/app/shared/loader/loader/loader.component';

const routes: Routes = [
  {
    path: '',
    component: WishListComponent,
  },
];

@NgModule({
  declarations: [WishListComponent, WishListItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    LoaderComponent,
  ],
})
export class WishListModule {}
