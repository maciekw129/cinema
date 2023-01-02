import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookTicketsComponent } from './pages/book-tickets/book-tickets.component';
import { FinalizeComponent } from './pages/finalize/finalize.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { ReservationComponent } from './pages/reservation/reservation.component';

const routes: Routes = [
    {
        path: '',
        component: BookTicketsComponent,
        children: [
            { path: '', redirectTo: 'reservation', pathMatch: 'full' },
            { path: 'reservation', component: ReservationComponent },
            { path: 'finalize', component: FinalizeComponent },
            { path: 'order-complete', component: OrderCompleteComponent }
          ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}