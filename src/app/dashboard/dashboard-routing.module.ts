import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
      {
        // Lazy load module.
        path: 'users',
        loadChildren: 'app/dashboard/users/users.module#UsersModule'
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class DashboardRoutingModule {}
