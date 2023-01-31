import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { API_URL } from 'src/app/env.token';
import { Movie } from 'src/types';

interface wantToWatch {
  id: number;
  movie: Movie;
}

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getWishList() {
    return this.http.get<wantToWatch[]>(
      `${this.API_URL}/wantToWatch?userId=${this.authService.userId}&_expand=movie`
    );
  }
}
