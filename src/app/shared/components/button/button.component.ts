import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  selector: 'app-button[text], app-button[icon]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text?: string;
  @Input() icon?: IconDefinition;
  @Input() important: boolean = false;
  @Input() disabled: boolean = false;
}
