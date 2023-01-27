import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [FontAwesomeModule, CommonModule]
})
export class ModalComponent {
  @Output() closeEvent = new EventEmitter<null>();
  close = faX;
  
  handleClose() {
    this.closeEvent.emit();
  }
}
