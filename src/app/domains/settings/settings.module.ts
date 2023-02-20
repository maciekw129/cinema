import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoaderComponent } from '../../shared/loader/loader/loader.component';
import { NoSpacesDirective } from 'src/app/shared/directives/no-spaces.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
];

@NgModule({
  declarations: [SettingsComponent, SettingsFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ButtonComponent,
    LoaderComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NoSpacesDirective,
  ],
})
export class SettingsModule {}
