import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

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

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private api: ApiService, private router: Router) {

    console.log('AuthService constructor.');

    this._loggedInUser = new BehaviorSubject<User>(undefined);
    this.dataStore = { loggedInUser: undefined };

    let loggedInUser: User = JSON.parse(localStorage.getItem('currentUser'));

    if (loggedInUser && loggedInUser.token) {

      if (!loggedInUser.token) {
        console.log('No token on loggedInUser.');
        this.logout();
      } else {
        let expired: boolean = true;
        let invalid: boolean = true;
        try {
          expired = this.jwtHelper.isTokenExpired(loggedInUser.token);
          invalid = false;
        } catch(ex) {
          invalid = true;
        }

        if(expired || invalid) {
          console.log('JWT Token: ' + (expired === true ? 'expired' : 'invalid'));
          this.logout();
        } else {
          console.log('User with valid token: logged in!');
          this.dataStore.loggedInUser = loggedInUser;
          this._loggedInUser.next(this.dataStore.loggedInUser);
          this.loggedIn = true;
          this.api.setHeaders({ Authorization: `Bearer ${this.dataStore.loggedInUser.token}`});
        }
      }
    }
  }

  get loggedInUser$() {
    return this._loggedInUser.asObservable();
  }

  login(credentials: AuthCredentials) {

    return this.api.post('/auth/login', credentials)
      .map((response) => {
        let user: User = this.jwtHelper.decodeToken(response.token);
        user.token = response.token;
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
    if (!this.dataStore.loggedInUser) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired(this.dataStore.loggedInUser.token)) {
      console.log('authService isLoggedIn() isTokenExpired');
      this.logout();
      return false;
    } else {
      console.log('isLoggedIn() ? ', this.loggedIn);
      return this.loggedIn;
    }
  }

}

export class AuthCredentials {
  email: string;
  password: string;
}
