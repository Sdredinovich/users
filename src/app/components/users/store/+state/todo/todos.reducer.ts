import { createFeature, createReducer, on } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { LoadingStatus } from '../../models/loadingStatus.model';
import { TodosActions } from './todos.actions';

export const todosFeatureKey = 'todos';

export interface State {
  todos: Todo[];
  status: LoadingStatus;
}

export const initialState: State = {
  todos: [],
  status: 'init',
};

export const reducer = createReducer(
  initialState,
  on(TodosActions.loadTodos, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: [...todos],
    status: 'loaded' as const,
  }))
);

export const todosFeature = createFeature({
  name: todosFeatureKey,
  reducer,
});
