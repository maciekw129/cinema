import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { selectData } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css'],
})
export class OrderCompleteComponent {
  private store = inject<Store<AppState>>(Store);

  userData$ = this.store.select(selectData);
}
