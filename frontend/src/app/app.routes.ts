import { Routes } from '@angular/router';
import { DataDisplayComponent } from './data-display/data-display.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    data: { title: 'User List' },
  },
  {
    path: 'display',
    component: DataDisplayComponent,
    data: { title: 'Data Display' },
  },
  {
    path: 'adduser',
    component: UserFormComponent,
    data: { title: 'User Form' },
  },
  /*{
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },*/
];
