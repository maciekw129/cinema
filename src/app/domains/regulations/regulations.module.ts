import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegulationsComponent } from './pages/regulations/regulations.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegulationsComponent
  }
]

@NgModule({
  declarations: [
    RegulationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegulationsModule {}
