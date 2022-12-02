import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent {
  @Input() buttonBarElements: string[] = [];
  @Input() isClicked: boolean = true;
  @Output() buttonEvent = new EventEmitter<{date: string, id: number}>();
  @ViewChild('buttonBar') buttonBar: ElementRef | undefined;

  clicked = 'button0';

  handleClick(element: HTMLButtonElement, index: number) {
    this.clicked = 'button' + index;
    this.buttonEvent.emit({date: String(index + 1), id: index});
  }
}
