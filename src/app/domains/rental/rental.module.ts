import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RentalComponent } from './pages/rental/rental.component';

const routes: Routes = [
  {
    path: '',
    component: RentalComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RentalModule {}
