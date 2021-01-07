import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';
import { isDate } from 'moment';
import { formatDate } from '@angular/common';
import { UltilService } from './ultil.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
    private globalService: GlobalService,
    private authGuardService: AuthGuardService,
    private router: Router,
    private ultilService: UltilService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = Object.assign(request);
    if (request.body) {
      newRequest.body = this.ultilService.getData(request.body);
    }
    this.globalService.requestEvent.emit(0);
    const token = this.authGuardService.getToken();
    newRequest = token ? newRequest.clone(
      {
        reportProgress: true,
        setHeaders: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    ) : newRequest.clone({ reportProgress: true });
    return next.handle(newRequest)
      .do(
        (event: HttpEvent<any>) => { },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
              this.authGuardService.clearToken();
              this.globalService.isLogin = false;
              this.router.navigate(['login']);
            }
          }
        })
      .pipe(
        map((event: HttpEvent<any>) => {
          this.globalService.requestEvent.emit(event.type < 5 ? event.type * 25 : 100);
          return event;
        }),
        finalize(() => {
          setTimeout(() => {
            this.globalService.requestEvent.emit(100);
          }, 1000);
        })
      );
  }

}
