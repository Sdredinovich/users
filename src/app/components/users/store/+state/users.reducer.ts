import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { LoadingStatus } from './../models/loadingStatus.model';
import { User } from 'src/app/components/users/store/models/user.model';

export const usersFeatureKey = 'users';

export interface State {
  users: User[];
  limit: number;
  status: LoadingStatus;
  companyNames: string[];
}

export const initialState: State = {
  users: [],
  limit: 3,
  status: 'init',
  companyNames: [],
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...users],
    status: 'loaded' as const,
  })),
  on(UsersActions.setLimit, (state, { limit }) => ({
    ...state,
    limit,
  })),
  on(UsersActions.changeSortSuccess, (state, { users }) => ({
    ...state,
    users: [...users],
  })),
   on(UsersActions.loadUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    users: [user],
    status: 'loaded' as const,
  })),
  on(UsersActions.loadUserFailed, (state, { error }) => {
    return {
      ...state,
      error,
      status: 'error' as const,
    }
  }),
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});
