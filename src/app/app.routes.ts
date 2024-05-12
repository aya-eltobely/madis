import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/users/components/users-list/users-list.component').then((x) => x.UsersListComponent),
        title: 'Users'
    },
    {
        path: 'user/:id',
        loadComponent: () => import('./pages/users/components/users-details/users-details.component').then((x) => x.UsersDetailsComponent),
        title: 'User Details'
    },

];
