import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { getToken } from './token';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Append auth token into the request header if user is authenticated
    if(getToken()){
        request = request.clone({
          setHeaders: {
            Authorization: `JWT ${getToken()}`
          }
        });
    }

    return next.handle(request);
  }
}