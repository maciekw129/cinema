import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddRoomFormComponent } from './forms/add-room-form/add-room-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPanelService } from './admin-panel.service';
import { LoaderComponent } from 'src/app/shared/loader/loader/loader.component';
import { AddScreeningComponent } from './components/add-screening/add-screening.component';
import { AddScreeningFormComponent } from './forms/add-screening-form/add-screening-form.component';
import { AddMovieComponent } from './components/add-movie/add-movie/add-movie.component';
import { AddMovieFormComponent } from './forms/add-movie-form/add-movie-form/add-movie-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
  },
  {
    path: 'add-room',
    component: AddRoomComponent,
  },
  {
    path: 'add-screening',
    component: AddScreeningComponent,
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
  },
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    AddRoomComponent,
    AddRoomFormComponent,
    AddScreeningComponent,
    AddScreeningFormComponent,
    AddMovieComponent,
    AddMovieFormComponent,
  ],
  imports: [
    ButtonComponent,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    LoaderComponent,
  ],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}