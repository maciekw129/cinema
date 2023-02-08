import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { selectData } from 'src/app/auth/store/auth.selectors';
import patterns from 'src/app/shared/validatorPatterns';
import { SettingsForm, Settings } from '../pages/settings/settings.interface';

@UntilDestroy()
@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css'],
})
export class SettingsFormComponent {
  @Output() sendSettingsForm = new EventEmitter<Settings>();

  private store = inject<Store<AppState>>(Store);
  private fb = inject(NonNullableFormBuilder);

  settingsForm: FormGroup<SettingsForm> = this.createForm();

  ngOnInit() {
    this.store
      .select(selectData)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.settingsForm = this.createForm(
            result.firstName,
            result.lastName,
            result.phone
          );
        }
        this.settingsForm.disable();
      });
  }

  enableForm() {
    this.settingsForm.enable();
  }

  cancelForm() {
    this.settingsForm.reset();
    this.settingsForm.disable();
  }

  handleSubmit() {
    this.settingsForm.markAllAsTouched();
    if (this.settingsForm.invalid) return;

    this.sendSettingsForm.emit(this.settingsForm.getRawValue());
  }

  get firstNameCtrl() {
    return this.settingsForm.controls.firstName;
  }

  get lastNameCtrl() {
    return this.settingsForm.controls.lastName;
  }

  get phoneCtrl() {
    return this.settingsForm.controls.phone;
  }

  createForm(firstName?: string, lastName?: string, phone?: string) {
    return this.fb.group({
      firstName: this.fb.control(firstName ? firstName : '', {
        validators: [Validators.maxLength(20), Validators.required],
      }),
      lastName: this.fb.control(lastName ? lastName : '', {
        validators: [Validators.maxLength(20), Validators.required],
      }),
      phone: this.fb.control(phone ? phone : '', {
        validators: [
          Validators.maxLength(12),
          Validators.minLength(9),
          Validators.pattern(patterns.phone),
        ],
      }),
    });
  }
}
