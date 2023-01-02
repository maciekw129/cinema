import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ScreeningResolver } from './domains/order/services/screening/screening.resolver';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent 
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'my-orders', 
    loadChildren: async() => (await import('./domains/my-orders/my-orders.module')).MyOrdersModule
  },
  {
    path: 'settings', 
    loadChildren: async() => (await import('./domains/settings/settings.module')).SettingsModule,
    canActivate: [AuthGuard]
  },
  { 
    path: 'book-tickets/:id', 
    loadChildren: async() => (await import('./domains/order/order.module')).OrderModule, 
    resolve: { screening: ScreeningResolver }
  },
  {
    path: 'about', 
    loadChildren: async() => (await import('./domains/about/about.module')).AboutModule
  },
  {
    path: 'work', 
    loadChildren: async() => (await import('./domains/work/work.module')).WorkModule
  },
  {
    path: 'regulations', 
    loadChildren: async() => (await import('./domains/regulations/regulations.module')).RegulationsModule
  },
  {
    path: 'rental', 
    loadChildren: async() => (await import('./domains/rental/rental.module')).RentalModule
  },
  {
    path: '**', redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
