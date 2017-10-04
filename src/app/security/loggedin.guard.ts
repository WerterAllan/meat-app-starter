import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(
    private loginService: LoginService
  ) { }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  public checkAuthentication(path: string): boolean {

    const loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`);
    }

    return loggedIn;
  }

  public canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot): boolean {

    return this.checkAuthentication(activatedRoute.routeConfig.path);

  }

}
