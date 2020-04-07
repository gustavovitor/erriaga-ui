import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListPageComponent } from './pages/person-list-page/person-list-page.component';
import { PersonFormPageComponent } from './pages/person-form-page/person-form-page.component';
import { PersonComponentsModule } from './person-components/person-components.module';


@NgModule({
  declarations: [PersonListPageComponent, PersonFormPageComponent],
  imports: [
    CommonModule,
    PersonComponentsModule,
    PersonsRoutingModule
  ]
})
export class PersonsModule { }
