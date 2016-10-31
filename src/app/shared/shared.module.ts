import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopnavComponent } from './topnav/topnav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponent, SidebarComponent, TopnavComponent]
})
export class SharedModule {

  constructor() {
    console.log('SharedModule constructor');
  }

}
