import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService, AuthCredentials } from '../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  private successLoginTarget: string = '/dashboard';

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {

    console.log('LoginComponent constructor.');

    let emailRegex = `([a-zA-Z0-9_.]{1}[a-zA-Z0-9_.]*)((@[a-zA-Z]{2}[a-zA-Z]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))`;
    this.formGroup = fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(emailRegex)])],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('Logged in' + 'You are logged in.');
      this.router.navigate([this.successLoginTarget]);
    }
  }

  submitForm(credentials: AuthCredentials) {
    this.authService.login(credentials)
      .subscribe(
        data => {

          console.log('Logged in' + 'You have successfully logged in.');

          console.log('Login successful. Sending user to dashboard.');
          this.router.navigate([this.successLoginTarget]);
        },
        error => {
          console.log('Login failed' + error.message);
          // TODO : Show message on form.
        });
  }

}
