import { Component, OnInit } from '@angular/core';
import getNextFiveDays from '../../../utils/getNextFiveDays';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonBarElements: string[] = getNextFiveDays();

  ngOnInit(): void {
  }
}
