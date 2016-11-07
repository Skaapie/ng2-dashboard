import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { User } from '../models/index';

@Injectable()
export class AuthService {

  private _loggedInUser: BehaviorSubject<User>;
  private dataStore: {
    loggedInUser: User
  };
  private loggedIn: boolean = false;

  public redirectUrl: string;

  constructor(private api: ApiService, private router: Router) {

    console.log('AuthService constructor.');

    this._loggedInUser = new BehaviorSubject<User>(undefined);
    this.dataStore = { loggedInUser: undefined };

    let loggedInUser = JSON.parse(localStorage.getItem('currentUser'));

    if (loggedInUser && loggedInUser.token) {
      console.log('AuthService constructor. User logged in!');
      this.dataStore.loggedInUser = loggedInUser;
      this._loggedInUser.next(this.dataStore.loggedInUser);
      this.loggedIn = true;
      this.api.setHeaders({ Authorization: `Bearer ${this.dataStore.loggedInUser.token}`});
    }
  }

  get loggedInUser$() {
    return this._loggedInUser.asObservable();
  }

  login(credentials: AuthCredentials) {

    return this.api.post('/authenticate', credentials)
      .map((user: User) => {

        if (user && user.token) {

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.dataStore.loggedInUser = user;
          this._loggedInUser.next(this.dataStore.loggedInUser);
          this.loggedIn = true;
          this.api.setHeaders({ Authorization: `Bearer ${this.dataStore.loggedInUser.token}`});

          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }
        }

      });
  }

  logout() {
    // Possibly emit event so that other services can purge?
    console.log('Logging user out.');
    localStorage.removeItem('currentUser');
    this.dataStore.loggedInUser = undefined;
    this._loggedInUser.next(null);
    this.api.resetHeaders();
    this.loggedIn = false;
  }

  isLoggedIn() {
    console.log('isLoggedIn() ? ', this.loggedIn);
    return this.loggedIn;
  }

}

export class AuthCredentials {
  email: string;
  password: string;
}
