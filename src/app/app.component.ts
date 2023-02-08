import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { API_URL } from './env.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private url = inject(API_URL);
  private authService = inject(AuthService);

  ngOnInit() {
    console.log(this.url);
  }
}
