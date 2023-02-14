import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
import { CartComponent } from './domains/cart/cart/cart.component';
import { CartItemComponent } from './domains/cart/cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './shared/components/modal/modal.component';
import { RatingScaleComponent } from './home/components/rating-scale/rating-scale.component';
import { CartEffects } from './domains/cart/store/cart.effects';
import { CartState } from './domains/cart/cart.interface';
import { cartReducer } from './domains/cart/store/cart.reducer';
import { CountCartItemsPipe } from './domains/cart/count-cart-items.pipe';
import { API_URL } from './env.token';
import { environment } from 'src/environment';
import { AuthState } from './auth/auth.interface';
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { fetchLoggedUser } from './auth/fetchLoggedUser';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { MatButtonModule } from '@angular/material';

export interface AppState {
  cart: CartState;
  auth: AuthState;
}

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
    CountCartItemsPipe,
  ],
  imports: [
    ButtonComponent,
    LoaderComponent,
    ModalComponent,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot({ cart: cartReducer, auth: authReducer }),
    EffectsModule.forRoot([CartEffects, AuthEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: fetchLoggedUser,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
