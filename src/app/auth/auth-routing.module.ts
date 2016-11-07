import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AuthRoutingModule {}
