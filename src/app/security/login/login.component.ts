import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from './../../../../backend/users';

import { NotificationService } from './../../shared/notification.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigatoTo: string;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('user@hotmail.com', [Validators.required, Validators.email]),
      password: this.fb.control('1234', [Validators.required])
    });

    this.navigatoTo = this.activateRoute.snapshot.params['to'] || btoa( '/');
  }

  public login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
                  (user: User) => this.notify(`Bem vindo, ${user.name}`),
                  response => this.notify(response.error.message),
                  () => { this.router.navigate( [ atob(this.navigatoTo) ] ) }
                );
  }

  private notify(message): void {
    this.notificationService.notify(message);
  }

}
