import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoaderState } from './loader.interface';

export class Loader {
  protected http = inject(HttpClient);

  private _requestState$$ = new BehaviorSubject<LoaderState>({
    status: 'initial',
  });

  get requestState$$() {
    return this._requestState$$.asObservable();
  }

  protected setLoading() {
    this._requestState$$.next({ status: 'pending' });
  }

  protected setLoaderStatus(value: LoaderState) {
    this._requestState$$.next(value);
  }

  clearLoaderState() {
    this._requestState$$.next({ status: 'initial' });
  }

  protected postWithLoader(
    url: string,
    payload: Record<any, any>,
    successMessage: string
  ) {
    this.setLoading();
    return this.http.post(url, payload).pipe(
      tap({
        next: () =>
          this._requestState$$.next({
            status: 'success',
            successMessage: successMessage,
          }),
        error: () =>
          this._requestState$$.next({
            status: 'failed',
            errorMessage: 'Coś poszło nie tak...',
          }),
      })
    );
  }

  protected patchWithLoader(
    url: string,
    payload: Record<any, any>,
    successMessage: string
  ) {
    this.setLoading();
    return this.http.patch(url, payload).pipe(
      tap({
        next: () =>
          this._requestState$$.next({
            status: 'success',
            successMessage: successMessage,
          }),
        error: () =>
          this._requestState$$.next({
            status: 'failed',
            errorMessage: 'Coś poszło nie tak...',
          }),
      })
    );
  }

  protected getWithLoader<T>(url: string, successMessage?: string) {
    this.setLoading();
    return this.http.get<T>(url).pipe(
      tap({
        next: () =>
          this._requestState$$.next({
            status: 'success',
            successMessage: successMessage,
          }),
        error: () =>
          this._requestState$$.next({
            status: 'failed',
            errorMessage: 'Coś poszło nie tak...',
          }),
      })
    );
  }
}
