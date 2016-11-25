import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  providers: [UsersService],
  declarations: [UsersComponent]
})
export class UsersModule {

  constructor() {
    console.log('UsersModule constructor');
  }

}
