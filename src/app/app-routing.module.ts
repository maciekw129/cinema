import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ScreeningResolver } from './domains/order/services/screening/screening.resolver';
import { CanLoginGuard } from './auth/guards/can-login.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { MovieListComponent } from './home/components/movie-list/movie-list.component';

const getToday = () => {
  const day = new Date();
  let mounth = `${day.getMonth() + 1}`;
  if (mounth.length === 1) {
    mounth = '0' + mounth;
  }
  return day.getDate() + '-' + mounth + '-' + day.getFullYear();
};

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./domains/adminPanel/admin-panel.module'))
        .AdminPanelModule,
    canMatch: [AdminGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanLoginGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CanLoginGuard],
  },
  {
    path: 'my-orders',
    loadChildren: async () =>
      (await import('./domains/my-orders/my-orders.module')).MyOrdersModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: async () =>
      (await import('./domains/settings/settings.module')).SettingsModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'book-tickets/:id',
    loadChildren: async () =>
      (await import('./domains/order/order.module')).OrderModule,
    resolve: { screening: ScreeningResolver },
  },
  {
    path: 'wish-list',
    loadChildren: async () =>
      (await import('./domains/wish-list/wish-list.module')).WishListModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: async () =>
      (await import('./domains/about/about.module')).AboutModule,
  },
  {
    path: 'work',
    loadChildren: async () =>
      (await import('./domains/work/work.module')).WorkModule,
  },
  {
    path: 'regulations',
    loadChildren: async () =>
      (await import('./domains/regulations/regulations.module'))
        .RegulationsModule,
  },
  {
    path: 'rental',
    loadChildren: async () =>
      (await import('./domains/rental/rental.module')).RentalModule,
  },
  {
    path: 'ticket/:id',
    loadComponent: async () =>
      (await import('./domains/ticket/ticket.component')).TicketComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${getToday()}`,
      },
      {
        path: ':date',
        component: MovieListComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
