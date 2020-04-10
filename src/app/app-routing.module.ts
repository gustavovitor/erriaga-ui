import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './services/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./persons/persons.module').then(m => m.PersonsModule)
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
