import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let header :any;

     if(this.auth.getToken())
     {
       
      header = {

        "Authorization": `Bearer ${this.auth.getToken()}`,
        'x-client-data':  `${this.auth.getClientToken()}`,
       "x-client-timezone" : new Date().toString(),
       "x-client-type" : 'WEB',
       "x-client-country" : 'india',

       
      }
    }
    else{

        header =   {
         'x-client-data':  `${this.auth.getClientToken()}`,
       "x-client-timezone" : new Date().toString(),
       "x-client-type" : 'WEB',
       "x-client-country" : 'india',
            
       }
    }



    request = request.clone({
      setHeaders: header,
      url: request.url
    });
        
   
    return next.handle(request);
  }
}
