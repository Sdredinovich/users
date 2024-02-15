import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { selectRouteParams } from 'src/app/store/router.selectors';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectAlltUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectLimit = createSelector(
  selectUsersState,
  (state) => state.limit
);

export const selectStatus = createSelector(
  selectUsersState,
  (state) => state.status
);

export const selectUser = createSelector(
  selectRouteParams,
  selectAlltUsers,
  ({ id }, users) => {
    return users.find((user) => user.id == id) || null;
  }
);
