import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Seat } from '../../order.interface';

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
