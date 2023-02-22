import { EnvironmentInjector } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TicketService } from './ticket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { API_URL } from '../../core/env.token';
import { Observable, of } from 'rxjs';
import { Movie, TicketTypes } from 'src/types';
import { Room } from '../adminPanel/admin-panel.interface';
import { CoreRequestsService } from '../../core/core-requests.service';

describe('TicketService', () => {
  const coreRequestsMock = {
    getMovieById(movieId: string): Observable<Movie> {
      return of({
        name: 'test',
        image: 'test',
        premiere: false,
        genre: ['test'],
        duration: 100,
        ageRestrictions: 'PG-8',
        description: 'test',
        rating: 0,
        id: 0,
      });
    },
    getRoomById(roomId: string): Observable<Room> {
      return of({
        name: 'test',
        rows: 10,
        columns: 10,
      });
    },
    getAllTicketTypes(): Observable<TicketTypes[]> {
      return of([
        {
          id: '1',
          name: 'test',
          price: 20,
        },
      ]);
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TicketService,
        { provide: API_URL, useValue: 'http://test' },
        { provide: CoreRequestsService, useValue: coreRequestsMock },
      ],
      imports: [HttpClientTestingModule],
    });
  });
  it('getTicket', (done) => {
    const expectedUrl = 'http://test/orders/1?_expand=screening';

    const responseMock = {
      screeningId: 1,
      seats: [
        [9, 5, 1],
        [9, 4, 1],
      ],
      userId: 1,
      ownerDetails: {
        firstName: 'test',
        lastName: 'test',
        phone: '123123123',
        email: 'test@test.pl',
      },
      id: 1,
      screening: {
        id: 1,
        movieId: 1,
        hour: ['15:30'],
        day: '17-02-2023',
        roomId: 1,
        seatsOccupied: [],
      },
    };

    const resultMock = {
      screeningId: 1,
      seats: [
        [9, 5, 1],
        [9, 4, 1],
      ],
      userId: 1,
      ownerDetails: {
        firstName: 'test',
        lastName: 'test',
        phone: '123123123',
        email: 'test@test.pl',
      },
      id: 1,
      screening: {
        id: 1,
        movieId: 1,
        movie: {
          name: 'test',
          image: 'test',
          premiere: false,
          genre: ['test'],
          duration: 100,
          ageRestrictions: 'PG-8',
          description: 'test',
          rating: 0,
          id: 0,
        },
        room: {
          name: 'test',
          rows: 10,
          columns: 10,
        },
        hour: ['15:30'],
        day: '17-02-2023',
        roomId: 1,
        seatsOccupied: [],
      },
    };

    const service = TestBed.inject(EnvironmentInjector).get(TicketService);
    const httpController = TestBed.inject(HttpTestingController);

    service.getTicket(1).subscribe({
      next: (res) => {
        expect(res).toEqual(resultMock);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush(responseMock);
  });

  it('getTicketTypes', (done) => {
    const service = TestBed.inject(EnvironmentInjector).get(TicketService);
    const responseMock = {
      '1': 'test',
    };

    service.getTicketTypes().subscribe({
      next: (res) => {
        expect(res).toEqual(responseMock);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });
  });
});
