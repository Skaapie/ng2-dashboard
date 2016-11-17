import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  private loggedInUser$;

  // Other option is to do something similar to this:
  // private _isLoggedIn: Boolean = false;
  // ngOnInit() {
  //   this.loggedInUser$ = this.authService.loggedInUser$;
  //
  //   // Remember to unsubscribe in ngOnDestroy.
  //   this.loggedInUserSubscription = this.loggedInUser$.subscribe(user => {
  //     if(user) {
  //       this._isLoggedIn = true;
  //     } else {
  //       this._isLoggedIn = false;
  //     }
  //   });
  // }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser$ = this.authService.loggedInUser$;
  }

  logout() {
    this.authService.logout('/');
  }

  // ngOnDestroy() {
    // Async pipes automatically unsubscribe from observables.
    // If you manually subscribe to them you will have to manually
    // unsubscribe them in ngOnDestroy to prevent a memory leak when
    // the component is destroyed.
    // e.g.
    // If you do this:
    // this.loggedInUserSubscription = this.loggedInUser$.subscribe(...);
    // then you have to do this in ngOnDestroy:
    // this.loggedInUserSubscription.unsubscribe();
  // }

}
