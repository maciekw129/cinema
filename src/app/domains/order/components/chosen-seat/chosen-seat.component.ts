import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Seat } from 'src/types';
import { OrderService } from '../../services/order/order.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-chosen-seat[seat]',
  templateUrl: './chosen-seat.component.html',
  styleUrls: ['./chosen-seat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChosenSeatComponent {
  private orderService = inject(OrderService);
  @Input() seat!: Seat;

  selectControl = new FormControl<number>(1);

  ngOnInit() {
    this.selectControl.setValue(this.seat[2]);

    this.selectControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) this.onSelectType(value);
      });
  }

  alphabeth: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  ticketTypes$ = this.orderService.selectTicketTypes$;
  trash = faTrash;

  onSelectType(value: number) {
    this.orderService.changeSeatType(this.seat, Number(value));
  }

  deleteChosenSeat() {
    this.orderService.deleteChosenSeat(this.seat);
  }
}
