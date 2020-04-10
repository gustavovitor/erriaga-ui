import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthRegisterFormComponent } from './auth-register-form/auth-register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [AuthFormComponent, AuthRegisterFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [AuthFormComponent, AuthRegisterFormComponent]
})
export class AuthComponentsModule { }
