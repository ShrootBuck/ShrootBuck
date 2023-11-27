import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },

  // Leave 404 page at the end
  { path: '**', component: NotFoundComponent },
];
