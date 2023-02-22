import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { AddScreeningForm } from '../../admin-panel.interface';

export const isHourInThePastValidator: ValidatorFn = (
  control: AbstractControl
) => {
  const today = new Date();
  const addScreeningForm = control as FormGroup<AddScreeningForm>;
  const startDateRaw = addScreeningForm.controls.day.value;
  const hour = addScreeningForm.controls.hour.value;

  if (startDateRaw && hour) {
    const startDate = new Date(startDateRaw);

    if (startDate.toDateString() === today.toDateString()) {
      const hourSplitted = hour.split(':');
      return today.getHours() < +hourSplitted[0] ||
        (today.getHours() === +hourSplitted[0] &&
          today.getMinutes() < +hourSplitted[1])
        ? null
        : { isHourInThePast: true };
    }
  }
  return null;
};
