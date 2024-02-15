import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodosActions } from './todos.actions';
import * as TodosSelector from './todos.selectot';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  store = inject(Store);

  todos$ = this.store.select(TodosSelector.selectAllTodos);
  status$ = this.store.select(TodosSelector.selectStatus);

  public getTodos(userId: number) {
    this.store.dispatch(TodosActions.loadTodos({ userId }));
  }
}
