import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTodos from './todos.reducer';

export const selectTodosState = createFeatureSelector<fromTodos.State>(
  fromTodos.todosFeatureKey
);

export const selectAllTodos = createSelector(
  selectTodosState,
  (state) => state.todos
);

export const selectStatus = createSelector(
  selectTodosState,
  (state) => state.status
);
