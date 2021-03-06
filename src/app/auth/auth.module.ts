import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';

import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AuthComponent, LoginComponent, ForgotComponent, SignupComponent]
})
export class AuthModule {

  constructor() {
    console.log('AuthModule constructor');
  }

}
