import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent {
  @Input() buttonBarElements: string[] = [];
  @Input() isClicked = true;
  @Output() buttonEvent = new EventEmitter<{date: string, id: number}>();

  clicked = 'button0';

  handleClick(element: HTMLButtonElement, index: number) {
    this.clicked = 'button' + index;
    this.buttonEvent.emit({date: String(index + 1), id: index});
  }
}
