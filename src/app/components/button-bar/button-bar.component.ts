import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent implements OnInit {
  @Input() buttonBarElements: string[] = [];

  ngOnInit(): void {
  }

}
