import { Component, inject, ViewChild } from '@angular/core';
import { SettingsFormComponent } from '../../settings-form/settings-form.component';
import { SettingsService } from '../../settings.service';
import { Settings } from './settings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  @ViewChild(SettingsFormComponent)
  private settingsForm!: SettingsFormComponent;
  private settingsService = inject(SettingsService);

  handlePatchSettings(settings: Settings) {
    this.settingsService.patchSettings(settings).subscribe();
  }
}
