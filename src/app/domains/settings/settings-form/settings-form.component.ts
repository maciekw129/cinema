import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/auth/auth.service';
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

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  settingsForm: FormGroup<SettingsForm> = this.createForm();

  ngOnInit() {
    this.authService.userData$$
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result.user) {
          this.settingsForm = this.createForm(
            result.user.firstName,
            result.user.lastName,
            result.user.phone
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
    console.log(this.settingsForm.disabled);
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
