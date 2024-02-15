import { User } from 'src/app/components/users/store/models/user.model';
import { UsersFacade } from '../store/+state/users.facade';
import { ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { LetDirective } from '@ngrx/component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterCompany } from 'src/app/pipes/filterCompany.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterLink,
    MatDividerModule,
    ReactiveFormsModule,
    UsersFilterComponent,
    LetDirective,
    NgxPaginationModule,
    FilterCompany,
    MatProgressBarModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersListComponent {
  cdr = inject(ChangeDetectorRef);
  usersFacade = inject(UsersFacade);
  router = inject(Router);
  company: string = '';
  users$ = this.usersFacade.users$;
  limit$ = this.usersFacade.limit$;
  loadingStatus$ = this.usersFacade.status$;
  page = 1;
  totalItems = 10;
  displayedColumns = ['AVA', 'FIO', 'LOGIN', 'EMAIL', 'ADDRESS'];

  ngOnInit() {
    this.usersFacade.getUsers();
  }

  changeLimit(limit: number) {
    this.usersFacade.setLimit(limit);
  }

  changeFilter(company: string) {
    this.company = company;
  }

  changeSort(param: string) {
    this.usersFacade.changeSort(param);
  }

}
