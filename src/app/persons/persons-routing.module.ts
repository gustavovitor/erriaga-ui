import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListPageComponent } from './pages/person-list-page/person-list-page.component';
import { PersonFormPageComponent } from './pages/person-form-page/person-form-page.component';
import { PersonsComponent } from './persons.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PersonsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PersonListPageComponent
      },
      {
        path: 'form/:id',
        component: PersonFormPageComponent
      },
      {
        path: 'form',
        component: PersonFormPageComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule {
}
