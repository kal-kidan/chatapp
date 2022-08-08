import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  setLoading(value: string) {
    localStorage.setItem('loading', value);
  }

  getLoading(): boolean {
    return localStorage.getItem('loading') === 'true';
  }
}
