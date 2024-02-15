import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from 'src/app/components/users/store/models/user.model';
import { Observable } from 'rxjs';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LetDirective,
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  cdr = inject(ChangeDetectorRef);
  @Output() setLimit = new EventEmitter();
  @Output() setFilter = new EventEmitter();
  @Input({ required: true }) users!: User[];

  fb = inject(FormBuilder);

  myForm = this.fb.group({
    limit: ['3'],
    company: [],
  });

  ngOnInit() {
    this.myForm
      .get('limit')
      ?.valueChanges.subscribe((limit) => this.setLimit.emit(limit));

    this.myForm.get('company')?.valueChanges.subscribe((company) => {
      this.setFilter.emit(company);
    });
  }
  companyReset() {
    this.myForm.get('company')?.setValue(null);
  }
}
