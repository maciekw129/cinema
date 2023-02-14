import { FormControl } from '@angular/forms';

export interface SettingsForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phone: FormControl<string>;
}

export interface Settings {
  firstName: string;
  lastName: string;
  phone: string;
}
