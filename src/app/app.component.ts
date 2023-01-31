import { Component, inject } from '@angular/core';
import { API_URL } from './env.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private url = inject(API_URL);

  ngOnInit() {
    console.log(this.url);
  }
}
