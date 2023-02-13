import { Component, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Screening } from '../../admin-panel.interface';
import { AdminPanelService } from '../../admin-panel.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.css'],
})
export class AddScreeningComponent {
  private adminPanelService = inject(AdminPanelService);

  requestState = this.adminPanelService.requestState$$;

  movies$ = this.adminPanelService.getAllMovies();
  rooms$ = this.adminPanelService.getAllRooms();

  data$ = combineLatest([this.movies$, this.rooms$]);

  createScreening(screening: Screening) {
    this.adminPanelService.createScreening(screening);
  }
}
