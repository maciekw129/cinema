import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent {
  @Input() buttonBarElements: string[] = [];
  @Input() isDisabled: boolean = false;
  @Output() buttonEvent = new EventEmitter<{date: string, index: number}>();
  @ViewChild('buttonBar') buttonBar: ElementRef | undefined;

  clicked = 'button0';

  handleClick(element: HTMLButtonElement, index: number) {
    this.clicked = 'button' + index;
    this.buttonEvent.emit({date: element.innerText, index: index + 1});
  }
}
