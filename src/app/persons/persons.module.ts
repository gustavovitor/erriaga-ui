import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListPageComponent } from './pages/person-list-page/person-list-page.component';
import { PersonFormPageComponent } from './pages/person-form-page/person-form-page.component';
import { PersonComponentsModule } from './person-components/person-components.module';
import { PersonsComponent } from './persons.component';


@NgModule({
  declarations: [PersonListPageComponent, PersonFormPageComponent, PersonsComponent],
  imports: [
    CommonModule,
    PersonComponentsModule,
    PersonsRoutingModule
  ],
  bootstrap: [PersonsComponent]
})
export class PersonsModule { }
