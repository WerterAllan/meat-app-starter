import { LoginService } from './login/login.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);

    if (loginService.isLoggedIn()) {

      console.log('interceptado');
      const authHeaders = { 'Authorization': `Bearer ${loginService.user.accessToken}` };
      const authRequest = request.clone({ setHeaders: authHeaders });
      return next.handle(authRequest);

    } else {
      return next.handle(request);
    }
  }

}
