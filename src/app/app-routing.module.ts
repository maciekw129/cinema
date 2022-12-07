import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { RegulationsComponent } from './pages/regulations/regulations.component';
import { RentalComponent } from './pages/rental/rental.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FinalizeComponent } from './pages/finalize/finalize.component';
import { BookTicketsComponent } from './pages/book-tickets/book-tickets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'work', component: WorkComponent },
  { path: 'regulations', component: RegulationsComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'book-tickets/:id', component: BookTicketsComponent,
    children: [
      { path: '', redirectTo: 'reservation', pathMatch: 'full' },
      { path: 'reservation', component: ReservationComponent },
      { path: 'finalize', component: FinalizeComponent }
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
