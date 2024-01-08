import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },

  // Leave 404 page at the end
  { path: '**', component: NotFoundComponent },
];
