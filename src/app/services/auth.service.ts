import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { AppUserModel } from '../models/app-user-model';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.loadToken();
  }

  URL = environment.URL_AUTH;
  URLUser = environment.URL_USER;
  URLToken = environment.URL_TOKEN_REVOKE;
  jwtPayLoad: any;
  token: string;

  /* loadToken é responsável por carregar o token do localstorage caso já haja um, e injeta-o no serviço. */
  private loadToken() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.saveToken(token);
    }
  }

  private getBasicSecurity() {
    return 'Basic ZXJyaWFnYS1hcGk6dyspVmpqIVkoKUVkJWo/Ykw7KCU+LnhhNiZaa3RNIy8=';
  }

  /* saveToken injeta o token no serviço. */
  private saveToken(token: string) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  register(user: AppUserModel): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.getBasicSecurity());
    return this.http.post<any>(`${this.URLUser}/register`, user, {headers, withCredentials: true}).toPromise();
  }

  login(user: AppUserModel): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.getBasicSecurity());
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${user.email}&password=${user.password}&grant_type=password`;
    return this.http.post<any>(this.URL, body, {headers, withCredentials: true}).toPromise()
      .then(res => {
        this.saveToken(res.access_token);
      })
      .catch(err => {
        if (err.status === 400 || err.status === 401) {
          if (err.error.error === 'invalid_grant' || err.error.error === 'unauthorized') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(err);
      });
  }

  getNewAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.getBasicSecurity());
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    return this.http.post<any>(this.URL, body, {headers, withCredentials: true}).toPromise()
      .then(res => {
        this.saveToken(res.access_token);
        return Promise.resolve(null);
      })
      .catch(err => {
        return Promise.reject(null);
      });
  }

  getNewAccessTokenSync() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.getBasicSecurity());
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    this.http.post<any>(this.URL, body, {headers, withCredentials: true})
      .subscribe(res => {
        this.saveToken(res.access_token);
      });
  }

  /** isAccessTokenInvalid checa se o token é inválido. */
  get isAccessTokenInvalid() {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  getValidAccessToken() {
    if (this.isAccessTokenInvalid) {
      this.getNewAccessTokenSync();
    }
    return this.token;
  }

  /** cleanAccessToken remove o token do localStorage. */
  cleanAccessToken() {
    this.token = null;
    localStorage.removeItem('access_token');
    this.jwtPayLoad = null;
  }

  validateToken() {
    if (this.isAccessTokenInvalid) {
      return this.getNewAccessToken()
        .then(() => {
          if (this.isAccessTokenInvalid) {
            return Promise.resolve(false);
          }
          return Promise.resolve(true);
        })
        .catch(() => {
          return Promise.resolve(false);
        });
    } else {
      return Promise.resolve(true);
    }
  }

  logout(): Promise<void> {
    return this.http.delete<void>(`${this.URLToken}`, { headers: {
        Authorization: 'Bearer ' + this.token
      }, withCredentials: true }).toPromise();
  }
}
