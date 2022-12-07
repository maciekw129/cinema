import { Component, Output, EventEmitter } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() closeEvent = new EventEmitter<{}>();
  close = faX;

  constructor() { }
  
  handleClose() {
    console.log('sdds')
    this.closeEvent.emit({});
  }
}
