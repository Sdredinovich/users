import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/components/users/store/models/user.model';
import { Store, select } from '@ngrx/store';
import { selectAlltUsers } from './users.selectot';
import { selectRouteParams } from 'src/app/store/router.selectors';

export const loadUsers$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const http = inject(HttpClient);

    return actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() => {
        return http
          .get<User[]>('https://jsonplaceholder.typicode.com/users')
          .pipe(
            map((users) => {
              const newArr = [...users].sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              });

              return UsersActions.loadUsersSuccess({ users: newArr });
            })
          );
      })
    );
  },
  { functional: true }
);

export const changeSort$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const allUsers$ = inject(Store).pipe(select(selectAlltUsers));
    return actions$.pipe(
      ofType(UsersActions.changeSort),
      withLatestFrom(allUsers$),
      switchMap(([{ param }, users]) => {
        if (param !== 'address') {
          const newUsers = [...users].sort((a, b) => {
            if (a[param as keyof User] < b[param as keyof User]) {
              return -1;
            }
            if (a[param as keyof User] > b[param as keyof User]) {
              return 1;
            }
            return 0;
          });

          return of(UsersActions.changeSortSuccess({ users: newUsers }));
        } else {
          const newUsers = [...users].sort((a, b) => {
            if (a.address.city < b.address.city) {
              return -1;
            }
            if (a.address.city > b.address.city) {
              return 1;
            }
            return 0;
          });

          return of(UsersActions.changeSortSuccess({ users: newUsers }));
        }
      })
    );
  },
  { functional: true }
);

export const loadUser$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const http = inject(HttpClient);
    const store = inject(Store);

    return actions$.pipe(
      ofType(UsersActions.loadUser),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([_, params]) => {
        return http
          .get<User>(
            `https://jsonplaceholder.typicode.com/users/${params['id']}`
          )
          .pipe(
            map((user) => UsersActions.loadUserSuccess({ user })),
            catchError((error) => {
              console.log('aaaa');
              return of(UsersActions.loadUserFailed({ error }));
            })
          );
      })
    );
  },
  { functional: true }
);
