import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { SharedModule } from '../../shared/shared.module';
import { PersonFilterFormComponent } from './person-filter-form/person-filter-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimeInputModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';



@NgModule({
  declarations: [PersonListComponent, PersonFormComponent, PersonFilterFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    DlDateTimeDateModule,
    NgBootstrapFormValidationModule,
    DlDateTimePickerModule,
    FormsModule,
    DlDateTimeInputModule,
    ReactiveFormsModule
  ],
  exports: [PersonListComponent, PersonFormComponent, PersonFilterFormComponent]
})
export class PersonComponentsModule { }
