import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, from as observableFromPromise } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { catchError, switchMap } from 'rxjs/operators';
import { tokenGetter } from '../app.module';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.URL_AUTH) && !req.url.includes('public')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          if (this.authService.isAccessTokenInvalid) {
            return observableFromPromise(this.authService.getNewAccessToken()).pipe(
              switchMap(() => {
                return next.handle(req.clone({
                  headers: req.headers.set('Authorization', 'Bearer ' + this.authService.token)
                }));
              })
            );
          }
        }
        return throwError(error);
      })
    );
  }

}
