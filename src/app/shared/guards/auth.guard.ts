import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Trying to navigate to: ', state.url);
    if (this.authService.isLoggedIn()) {
      // console.log('AuthGaurd: User logged in, allow.');
      return true;
    } else {
      this.authService.redirectUrl = state.url;

      // notify and send user to login
      console.log('You are not logged in!' + 'Please log in to continue.');

      console.log('AuthGaurd redirecting user to login.')
      this.router.navigate(['/login']);

      return false;
    }
  }

}
