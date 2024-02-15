import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersActions } from './users.actions';
import * as UsersSelector from './users.selectot';
import { selectRouteParams } from 'src/app/store/router.selectors';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  store = inject(Store);

  users$ = this.store.select(UsersSelector.selectAlltUsers);
  limit$ = this.store.select(UsersSelector.selectLimit);
  status$ = this.store.select(UsersSelector.selectStatus);
  openedUser$ = this.store.select(UsersSelector.selectUser)
  userId$ = this.store.select(selectRouteParams);


  public getUsers() {
    this.store.dispatch(UsersActions.loadUsers());
  }
  public getUser() {
    this.store.dispatch(UsersActions.loadUser());
  }
  public setLimit(limit: number) {
    this.store.dispatch(UsersActions.setLimit({ limit }));
  }
  public changeSort(param: string) {
    this.store.dispatch(UsersActions.changeSort({ param }));
  }
}
