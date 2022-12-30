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
import { SeatComponent } from './components/seat/seat.component';
import { ChosenSeatComponent } from './components/chosen-seat/chosen-seat.component';
import { FinalizeComponent } from './pages/finalize/finalize.component';
import { BookTicketsComponent } from './pages/book-tickets/book-tickets.component';
import { FinalizeFormComponent } from './forms/finalize-form/finalize-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { OrderComponent } from './components/order/order.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { PaymentFormComponent } from './forms/payment-form/payment-form.component';
import { HeaderDropdownComponent } from './components/header-dropdown/header-dropdown.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

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
    SeatComponent,
    ChosenSeatComponent,
    FinalizeComponent,
    BookTicketsComponent,
    FinalizeFormComponent,
    ModalComponent,
    OrderCompleteComponent,
    MyOrdersComponent,
    OrderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PaymentFormComponent,
    HeaderDropdownComponent,
    SettingsComponent,
    CartComponent,
    CartItemComponent,
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
