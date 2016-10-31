import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        // Lazy load module.
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {}
