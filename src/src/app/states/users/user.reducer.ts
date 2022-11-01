
import { createReducer, on } from '@ngrx/store';
import { search, get } from './user.action';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(search, (state) => state + 1),
  on(get, (state) => state - 1),
);
