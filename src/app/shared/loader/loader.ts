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

  protected postWithLoader(
    url: string,
    payload: Record<any, any>,
    successMessage: string
  ) {
    this.setLoading();
    this.http.post(url, payload).subscribe({
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
    });
  }

  protected patchWithLoader(
    url: string,
    payload: Record<any, any>,
    successMessage: string
  ) {
    this.setLoading();
    return this.http.patch(url, payload).pipe(
      tap((r) => console.log(r)),
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
