import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Movie } from 'src/types';

interface wantToWatch {
  id: number;
  movie: Movie;
}

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getWishList() {
    return this.http.get<wantToWatch[]>(
      `http://localhost:3000/wantToWatch?userId=${this.authService.userId}&_expand=movie`
    );
  }
}
