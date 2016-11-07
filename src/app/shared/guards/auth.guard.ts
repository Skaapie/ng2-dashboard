import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, CanLoad, Route } from '@angular/router';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('AuthGaurd: User logged in, allow: ' + url);
      return true;
    }

    // Store attempted URL for redirecting.
    this.authService.redirectUrl = url;

    // notify and send user to login
    console.log('You are not logged in!' + 'Please log in to continue.');
    console.log('AuthGaurd redirecting user to login.')
    this.router.navigate(['']);

    return false;
  }

}
