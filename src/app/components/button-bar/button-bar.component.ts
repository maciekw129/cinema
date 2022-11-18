import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent {
  @Input() buttonBarElements: string[] = [];
  @Output() buttonEvent = new EventEmitter<string>();
  @ViewChild('buttonBar') buttonBar: ElementRef | undefined;

  ngAfterViewInit() {
    console.log(this.buttonBar?.nativeElement)
    this.buttonBar?.nativeElement.children[0].classList.add('button-bar__button--clicked');
  }

  clearColor() {
    const buttonsCollection: HTMLCollection = this.buttonBar?.nativeElement.children;
    Array.from(buttonsCollection).forEach((button: Element) => {
        button.classList.remove('button-bar__button--clicked');
    })
  }

  handleClick(element: HTMLButtonElement) {
    this.clearColor();
    element.classList.add('button-bar__button--clicked');
    this.buttonEvent.emit(element.innerText);
  }
}
