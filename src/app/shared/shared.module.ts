import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService, AuthService } from './services/index';

import { AuthGuard } from './guards/auth.guard';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopnavComponent } from './topnav/topnav.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SidebarComponent, TopnavComponent, EqualValidatorDirective],
  exports: [SidebarComponent, TopnavComponent, EqualValidatorDirective]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [ApiService, AuthService, AuthGuard]
      };
    }

  constructor() {
    console.log('SharedModule constructor');
  }

}