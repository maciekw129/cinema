import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderState } from '../loader.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loader[requestState]',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class LoaderComponent {
  @Input() requestState!: LoaderState;
}
