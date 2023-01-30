import { Component, inject } from '@angular/core';
import { SettingsService } from '../../settings.service';
import { Settings } from './settings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  private settingsService = inject(SettingsService);

  handlePatchSettings(settings: Settings) {
    this.settingsService.patchSettings(settings).subscribe();
  }
}
