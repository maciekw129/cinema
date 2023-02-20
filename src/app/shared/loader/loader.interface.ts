export interface LoaderSuccess {
  status: 'success';
  successMessage?: string;
}

export interface LoaderFailed {
  status: 'failed';
  errorMessage: string;
}

export interface LoaderPending {
  status: 'pending';
}

export interface LoaderInitial {
  status: 'initial';
}

export type LoaderState =
  | LoaderSuccess
  | LoaderFailed
  | LoaderPending
  | LoaderInitial;

export type LoaderStatuses = 'pending' | 'initial' | 'failed' | 'success';
