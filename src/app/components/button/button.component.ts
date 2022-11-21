import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() text?: string;
  @Input() icon?: IconDefinition;
  @Input() important: boolean = false;
  
  ngOnInit(): void {
  }

  getStyle() {
    return `button ${this.important ? 'button--important' : ''}`;
  }
}
