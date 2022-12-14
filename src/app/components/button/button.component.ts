import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
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
