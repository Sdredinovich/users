import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/components/users/store/models/user.model';
// import { Post } from '../models/post.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    setLimit: props<{ limit: number }>(),
    changeSort: props<{ param: string }>(),
    changeSortSuccess: props<{ users: User[] }>(),
    loadUser: emptyProps(),
    loadUserSuccess: props<{ user: User }>(),
    loadUserFailed: props<{ error: Error }>(),

  },
});
