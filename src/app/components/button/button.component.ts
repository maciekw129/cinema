import { Component, Input } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text?: string;
  @Input() icon?: IconDefinition;
  @Input() important: boolean = false;
  @Input() type: string = '';
  @Input() disabled: boolean = false;
}
