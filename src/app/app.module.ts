import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';
import { MovieComponent } from './components/movie/movie.component';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { RegulationsComponent } from './pages/regulations/regulations.component';
import { RentalComponent } from './pages/rental/rental.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SeatsGridComponent } from './components/seats-grid/seats-grid.component';
import { SeatComponent } from './components/seat/seat.component';
import { ChosenSeatComponent } from './components/chosen-seat/chosen-seat.component';
import { FinalizeComponent } from './pages/finalize/finalize.component';
import { BookTicketsComponent } from './pages/book-tickets/book-tickets.component';
import { FinalizeFormComponent } from './components/finalize-form/finalize-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    HomeComponent,
    ButtonBarComponent,
    MovieComponent,
    AboutComponent,
    WorkComponent,
    RegulationsComponent,
    RentalComponent,
    ReservationComponent,
    LoginComponent,
    RegisterComponent,
    SeatsGridComponent,
    SeatComponent,
    ChosenSeatComponent,
    FinalizeComponent,
    BookTicketsComponent,
    FinalizeFormComponent,
    ModalComponent,
    OrderCompleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
