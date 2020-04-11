import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import * as moment from 'moment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ERRORS } from './validation-messages';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HttpClientInterceptor } from './services/http-client-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CustomToastComponent } from './util/custom-toast/custom-toast';
import { SharedModule } from './shared/shared.module';

moment.locale('pt-BR');

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CustomToastComponent
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
    ToastrModule.forRoot({
      toastComponent: CustomToastComponent
    }),
    NgxMaskModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }
  ],
  entryComponents: [CustomToastComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
