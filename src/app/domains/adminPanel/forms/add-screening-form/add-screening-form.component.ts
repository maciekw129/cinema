import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  AddScreeningForm,
  FetchedMovie,
  FetchedRoom,
  Screening,
} from '../../admin-panel.interface';

@Component({
  selector: 'app-add-screening-form[movies][rooms]',
  templateUrl: './add-screening-form.component.html',
  styleUrls: ['./add-screening-form.component.css'],
})
export class AddScreeningFormComponent {
  @Output() handleSubmitEvent = new EventEmitter<Screening>();
  @Input() movies!: FetchedMovie[];
  @Input() rooms!: FetchedRoom[];

  private builder = inject(NonNullableFormBuilder);
  addScreeningForm = this.createForm();
  today = new Date();

  get movieIdCtrl() {
    return this.addScreeningForm.controls.movieId;
  }

  get hourCtrl() {
    return this.addScreeningForm.controls.hour;
  }

  get dayCtrl() {
    return this.addScreeningForm.controls.day;
  }

  get roomIdCtrl() {
    return this.addScreeningForm.controls.roomId;
  }

  getNextFiveDays() {
    return [...Array(5)].map((_, index) => {
      let day = new Date();
      day.setDate(day.getDate() + index);
      return day.getDate() + '/' + (day.getMonth() + 1);
    });
  }

  handleSubmit() {
    this.addScreeningForm.markAllAsTouched();
    if (this.addScreeningForm.invalid) return;

    const { movieId, hour, day, roomId } = this.addScreeningForm.getRawValue();

    const dayPicked = new Date(day);
    let mounth = `${dayPicked.getMonth() + 1}`;
    if (mounth.length === 1) {
      mounth = '0' + mounth;
    }
    const properDay =
      dayPicked.getDate() + '-' + mounth + '-' + dayPicked.getFullYear();

    this.handleSubmitEvent.emit({
      movieId: +movieId!,
      hour: [hour],
      day: properDay,
      roomId: +roomId!,
      seatsOccupied: [],
    });
  }

  private createForm() {
    return this.builder.group<AddScreeningForm>({
      movieId: this.builder.control(null, {
        validators: [Validators.required],
      }),
      hour: this.builder.control('', {
        validators: [Validators.required],
      }),
      day: this.builder.control('', {
        validators: [Validators.required],
      }),
      roomId: this.builder.control(null, {
        validators: [Validators.required],
      }),
    });
  }
}
