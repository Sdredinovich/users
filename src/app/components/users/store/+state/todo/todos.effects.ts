import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosActions } from "./todos.actions";
import { map, switchMap } from "rxjs";
import { Todo } from "../../models/todo.model";

export const loadUsers$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const http = inject(HttpClient);

    return actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(({userId})=>{
        return http.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).pipe(
          map(todos=>{

            todos.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));



            return TodosActions.loadTodosSuccess({todos})})
        )
      })

    );
  },
  { functional: true }
);
