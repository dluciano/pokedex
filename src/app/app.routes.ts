import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChildDetailComponent } from './pokemon/child-detail/child-detail.component';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  {
    path: 'pokemon', children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':id',
        component: ChildDetailComponent
      }]
  },
  { path: '**', component: NoContentComponent },
];
