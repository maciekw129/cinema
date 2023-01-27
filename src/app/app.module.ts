import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/components/header/header.component';
import { FooterComponent } from './home/components/footer/footer.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { HomeComponent } from './home/home.component';
import { ButtonBarComponent } from './home/components/button-bar/button-bar.component';
import { MovieComponent } from './home/components/movie/movie.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { LoginFormComponent } from './auth/forms/login-form/login-form.component';
import { RegisterFormComponent } from './auth/forms/register-form/register-form.component';
import { HeaderDropdownComponent } from './home/components/header-dropdown/header-dropdown.component';
import { CartComponent } from './home/components/cart/cart.component';
import { CartItemComponent } from './home/components/cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './shared/components/modal/modal.component';
import { RatingScaleComponent } from './home/components/rating-scale/rating-scale.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ButtonBarComponent,
    MovieComponent,
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HeaderDropdownComponent,
    CartComponent,
    CartItemComponent,
    RatingScaleComponent,
  ],
  imports: [
    ButtonComponent,
    ModalComponent,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
