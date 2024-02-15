import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
// import { Post } from '../models/post.model';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    loadTodos: props<{userId:number}>(),
    loadTodosSuccess: props<{ todos: Todo[] }>(),

  },
});
