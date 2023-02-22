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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OnlyNumbersDirective } from 'src/app/shared/directives/only-numbers.directive';
import { NoLeadingZerosDirective } from 'src/app/shared/directives/no-leading-zeros.directive';

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
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ButtonComponent,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    LoaderComponent,
    OnlyNumbersDirective,
    NoLeadingZerosDirective,
  ],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
