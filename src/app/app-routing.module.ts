import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./components/users/users-list/users-list.component'),
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./components/users/user-card/user-card.component'),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
