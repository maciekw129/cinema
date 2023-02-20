import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import patterns from 'src/app/shared/validatorPatterns';
import { AddMovieForm, Genre, Movie } from '../../../admin-panel.interface';

@Component({
  selector: 'app-add-movie-form[genres]',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.css'],
})
export class AddMovieFormComponent {
  @Input() genres!: Genre[];
  @Output() handleSubmitEvent = new EventEmitter<Movie>();

  private builder = inject(NonNullableFormBuilder);
  addMovieForm = this.createForm();

  private addGenre(genre: Genre) {
    this.genreCtrl.setValue([...this.genreCtrl.value, genre]);
  }

  private removeGenre(genre: Genre) {
    this.genreCtrl.setValue(
      this.genreCtrl.value.filter((value) => value !== genre)
    );
  }

  toggleGenre(genre: Genre) {
    if (this.genreCtrl.value.includes(genre)) {
      this.removeGenre(genre);
    } else {
      this.addGenre(genre);
    }
  }

  handleSubmit() {
    this.addMovieForm.markAllAsTouched();
    if (this.addMovieForm.invalid) return;

    const value = this.addMovieForm.getRawValue();
    const { duration, ageRestrictions } = value;

    if (duration !== null && ageRestrictions !== null) {
      duration;
      this.handleSubmitEvent.emit({
        ...value,
        duration: duration + 'min.',
        ageRestrictions: 'PG-' + ageRestrictions,
        rating: 0,
      });
    }
  }

  get nameCtrl() {
    return this.addMovieForm.controls.name;
  }

  get imageCtrl() {
    return this.addMovieForm.controls.image;
  }

  get premiereCtrl() {
    return this.addMovieForm.controls.premiere;
  }

  get genreCtrl() {
    return this.addMovieForm.controls.genre;
  }

  get durationCtrl() {
    return this.addMovieForm.controls.duration;
  }

  get ageRestrictionsCtrl() {
    return this.addMovieForm.controls.ageRestrictions;
  }

  get descriptionCtrl() {
    return this.addMovieForm.controls.description;
  }

  private createForm() {
    return this.builder.group<AddMovieForm>({
      name: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(40),
        ],
      }),
      image: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.pattern(patterns.url),
          Validators.maxLength(2048),
        ],
      }),
      premiere: this.builder.control(false),
      genre: this.builder.control([], {
        validators: Validators.required,
      }),
      duration: this.builder.control(null, {
        validators: [
          Validators.min(1),
          Validators.required,
          Validators.max(999),
        ],
      }),
      ageRestrictions: this.builder.control(null, {
        validators: [
          Validators.min(0),
          Validators.max(18),
          Validators.required,
        ],
      }),
      description: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(4000),
          Validators.minLength(4),
        ],
      }),
    });
  }
}
