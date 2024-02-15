import { UsersFacade } from './../store/+state/users.facade';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TodosFacade } from '../store/+state/todo/todos.facade';
import { LetDirective } from '@ngrx/component';
import { map, take, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    LetDirective,
    MatTableModule,
    MatCheckboxModule,
    MatProgressBarModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserCardComponent {
  displayedColumns = ['ID', 'TITLE', 'COMPLETED'];
  usersFacade = inject(UsersFacade);
  todosFacade = inject(TodosFacade);
  usersStatus$ = this.usersFacade.status$;
  todosStatus$ = this.todosFacade.status$;
  todos$ = this.todosFacade.todos$;
  userId$ = this.usersFacade.userId$;
  user$ = this.usersFacade.openedUser$.pipe(
    map((user) => {
      if (!user) {
        this.usersFacade.getUser();
      }
      return user;
    })
  );

  constructor() {
    this.user$
      .pipe(take(1), withLatestFrom(this.userId$))
      .subscribe(([_, params]) => {
        return this.todosFacade.getTodos(params['id']);
      });
  }
}
