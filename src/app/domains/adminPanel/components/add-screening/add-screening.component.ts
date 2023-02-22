import { Component, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CoreRequestsService } from '../../../../core/core-requests.service';
import { Screening } from '../../admin-panel.interface';
import { AdminPanelService } from '../../admin-panel.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.css'],
})
export class AddScreeningComponent {
  private adminPanelService = inject(AdminPanelService);
  private coreRequestsService = inject(CoreRequestsService);

  requestState = this.adminPanelService.requestState$$;

  movies$ = this.coreRequestsService.getAllMovies();
  rooms$ = this.coreRequestsService.getAllRooms();

  data$ = combineLatest([this.movies$, this.rooms$]);

  createScreening(screening: Screening) {
    this.adminPanelService.createScreening(screening).subscribe();
  }

  ngOnDestroy() {
    this.adminPanelService.clearLoaderState();
  }
}
