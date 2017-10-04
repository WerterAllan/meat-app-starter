import { LoginService } from './security/login/login.service';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { NotificationService } from 'app/shared/notification.service';

@Injectable()
export class ApplicationErrorHander extends ErrorHandler {

  constructor(
    private zone: NgZone,
    private ns: NotificationService,
    private injector: Injector) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {

    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this.zone.run(() => {

        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado.');
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique no console para mais detalhes');
            break;
        }

      });
    }
    super.handleError(errorResponse);
  }

}
