import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Room } from '../../admin-panel.interface';
import { AdminPanelService } from '../../admin-panel.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminPanelService],
})
export class AddRoomComponent {
  private adminPanelService = inject(AdminPanelService);
  requestState = this.adminPanelService.requestState$$;

  createRoom(room: Room) {
    this.adminPanelService.createRoom(room);
  }
}
