import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { RegulationsComponent } from './pages/regulations/regulations.component';
import { RentalComponent } from './pages/rental/rental.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FinalizeComponent } from './pages/finalize/finalize.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'work', component: WorkComponent },
  { path: 'regulations', component: RegulationsComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'reservation/:id', component: ReservationComponent,
    children: [
      { path: '', redirectTo: 'choose-seat', pathMatch: 'full' },
      { path: 'choose-seat', component: ReservationComponent },
      { path: 'finalize', component: LoginComponent }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
