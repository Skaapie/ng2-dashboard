import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: 'home', component: HomeComponent },
          // Lazy load module.
          { path: 'users', loadChildren: 'app/dashboard/users/users.module#UsersModule'}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class DashboardRoutingModule {}
