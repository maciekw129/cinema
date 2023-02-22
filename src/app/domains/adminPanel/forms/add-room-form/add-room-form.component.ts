import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Room } from '../../admin-panel.interface';

@Component({
  selector: 'app-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrls: ['./add-room-form.component.css'],
})
export class AddRoomFormComponent {
  @Output() handleSubmitEvent = new EventEmitter<Room>();
  private builder = inject(NonNullableFormBuilder);
  addRoomForm = this.createForm();

  get nameCtrl() {
    return this.addRoomForm.controls.name;
  }

  get rowsCtrl() {
    return this.addRoomForm.controls.rows;
  }

  get columnsCtrl() {
    return this.addRoomForm.controls.columns;
  }

  handleSubmit() {
    this.addRoomForm.markAllAsTouched();
    if (this.addRoomForm.invalid) return;

    const { name, rows, columns } = this.addRoomForm.getRawValue();

    this.handleSubmitEvent.emit({
      name,
      rows: +rows,
      columns: +columns,
    });
  }

  private createForm() {
    return this.builder.group({
      name: this.builder.control('', {
        validators: [Validators.required],
      }),
      rows: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.min(5),
          Validators.max(25),
        ],
      }),
      columns: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.min(5),
          Validators.max(25),
        ],
      }),
    });
  }
}
