import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AdminPanelService, FetchedScreening } from './admin-panel.service';
import { API_URL } from '../../core/env.token';
import { EnvironmentInjector } from '@angular/core';
import { FetchedGenre, Screening, RawScreening } from './admin-panel.interface';
import { CoreRequestsService } from '../../core/core-requests.service';
import { Observable, of } from 'rxjs';
import { Movie } from '../../../types';

describe('AdminPanelService', () => {
  const coreRequestsMock = {
    getAllGenres(): Observable<FetchedGenre[]> {
      return of([
        {
          id: 1,
          name: 'dramat',
        },
        {
          id: 2,
          name: 'komedia',
        },
      ]);
    },
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
    getScreeningByDayAndRoom(
      day: string,
      roomId: string
    ): Observable<FetchedScreening[]> {
      return of([
        {
          id: 0,
          movieId: 0,
          movie: {
            name: 'test',
            image: 'test',
            premiere: false,
            genre: ['dramat'],
            duration: 120,
            ageRestrictions: 'PG-8',
            description: 'test',
            rating: 0,
            id: 0,
          },
          hour: ['11:11'],
          day: '21-02-2023',
          roomId: 0,
        },
      ]);
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AdminPanelService,
        { provide: API_URL, useValue: 'http://test' },
        { provide: CoreRequestsService, useValue: coreRequestsMock },
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('createRoom', (done) => {
    const expectedUrl = 'http://test/rooms';
    const mockPayload = { name: 'test', rows: 10, columns: 10 };
    const mockResponse = { name: 'test', rows: 10, columns: 10, id: 1 };

    const service = TestBed.inject(EnvironmentInjector).get(AdminPanelService);
    const httpController = TestBed.inject(HttpTestingController);

    service.createRoom(mockPayload).subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        done();
      },
    });

    const req = httpController.expectOne({
      url: expectedUrl,
      method: 'POST',
    });

    req.flush(mockResponse);
  });

  it('createScreening', (done) => {
    const expectedUrl = 'http://test/screenings';
    const mockPayload: Screening = {
      movieId: 1,
      hour: ['14:30'],
      day: '12-12-2023',
      roomId: 1,
      seatsOccupied: [],
    };
    const mockResponse = {
      movieId: 1,
      hour: ['14:30'],
      day: '12-12-2023',
      roomId: 1,
      seatsOccupied: [],
    };

    const service = TestBed.inject(EnvironmentInjector).get(AdminPanelService);
    const httpController = TestBed.inject(HttpTestingController);

    service.createScreening(mockPayload).subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        done();
      },
    });

    const req = httpController.expectOne({
      url: expectedUrl,
      method: 'POST',
    });

    req.flush(mockResponse);
  });

  it('getAllGenres', (done) => {
    const service = TestBed.inject(EnvironmentInjector).get(AdminPanelService);

    service.getAllGenres().subscribe({
      next: (result) => {
        expect(result[0]).toBe('dramat');
        expect(result[1]).toBe('komedia');
        done();
      },
    });
  });

  it('checkIfIsAnotherScreeningInRoomReturnFalse', (done) => {
    const service = TestBed.inject(EnvironmentInjector).get(AdminPanelService);

    const rawScreeningMock: RawScreening = {
      movieId: '1',
      hour: '11:11',
      day: '21 February 2023',
      roomId: '0',
    };
    service.checkIfIsAnotherScreeningInRoom(rawScreeningMock).subscribe({
      next: (result) => {
        expect(result).toBe(false);
        done();
      },
    });
  });

  it('checkIfIsAnotherScreeningInRoomReturnTrue', (done) => {
    const service = TestBed.inject(EnvironmentInjector).get(AdminPanelService);

    const rawScreeningMock: RawScreening = {
      movieId: '1',
      hour: '11:11',
      day: '1 January 2023',
      roomId: '0',
    };
    service.checkIfIsAnotherScreeningInRoom(rawScreeningMock).subscribe({
      next: (result) => {
        expect(result).toBe(true);
        done();
      },
    });
  });
});
