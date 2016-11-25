import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users$;

  constructor(private usersService: UsersService) {
    console.log('UsersComponent constructor.');
  }

  ngOnInit() {
    this.users$ = this.usersService.users$;
  }

  loadUsers() {
    this.usersService.loadUsers()
      .subscribe(
        data => {
          console.log('LoadUsers');
          // debugger


        },
        error => {
          console.log('LoadUsers failed' + error.message);
          debugger
          // TODO : Show message on form.
        });
  }

}
