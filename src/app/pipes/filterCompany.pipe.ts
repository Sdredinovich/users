import { ChangeDetectorRef, Pipe, PipeTransform, inject } from '@angular/core';
import { User } from '../components/users/store/models/user.model';

@Pipe({
  name: 'filterCompany',
  standalone: true,
})
export class FilterCompany implements PipeTransform {
  cdr = inject(ChangeDetectorRef)
  transform(value: User[], company: string): User[] {
    return company
      ? value.filter((user) => {
          return user.company.name == company;
        })
      : value;
  }
}
