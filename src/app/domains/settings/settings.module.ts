import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Loader } from 'src/app/shared/loader/loader';
import { LoaderComponent } from 'src/app/shared/loader/loader/loader.component';

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
  ],
})
export class SettingsModule {}
