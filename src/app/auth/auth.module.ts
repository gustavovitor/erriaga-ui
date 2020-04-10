import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthComponentsModule } from './auth-components/auth-components.module';


@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    AuthComponentsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
