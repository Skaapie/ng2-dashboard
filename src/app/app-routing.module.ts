import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      },
      {
        // Lazy load module.
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {}
