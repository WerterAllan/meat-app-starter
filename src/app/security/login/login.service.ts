import { Router, NavigationEnd } from '@angular/router';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';


import { MEAT_API } from './../../app.api';

@Injectable()
export class LoginService {

  public user: User;
  public lastUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router) {

    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  public isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${MEAT_API}/login`,
      { email: email, password: password })
      .do(user => this.user = user);

  }

  public loggout(): void {
    this.user = undefined;
  }

  public handleLogin(path = this.lastUrl): void {
    this.router.navigate(['/login', btoa(path)]);
  }

}

