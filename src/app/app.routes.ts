import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  { path: 'projects', component: ProjectsComponent },

  // Leave 404 page at the end
  { path: '**', component: NotFoundComponent },
];
