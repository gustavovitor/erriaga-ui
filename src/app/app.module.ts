import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import * as moment from 'moment';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ERRORS } from './validation-messages';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

moment.locale('pt-BR');

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: environment.WhitelistedDomains,
        blacklistedRoutes: environment.BlacklistedDomains
      }
    }),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
