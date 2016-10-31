import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopnavComponent } from './topnav/topnav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SidebarComponent, TopnavComponent],
  exports: [SidebarComponent, TopnavComponent]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: []
      };
    }

  constructor() {
    console.log('SharedModule constructor');
  }

}