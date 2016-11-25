import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { ApiService } from '../../shared/services/api.service';
import { User } from '../../shared/models/index';

@Injectable()
export class UsersService {

  private _usersArr: BehaviorSubject<User[]>;
  private dataStore: {
    users: User[]
  };

  constructor(private api: ApiService) {
    console.log('UsersService constructor.');

    this._usersArr = new BehaviorSubject<User[]>([]);
    this.dataStore = { users: [] };
  }

  get users$() {
    return this._usersArr.asObservable();
  }

  loadUsers() {

    return this.api.get('/users')
      .map((response: User[]) => {

        // Possibly keep the data in the store and just update it with the changes received from the response.


        // Clear the array.
        this.dataStore.users.length = 0;

        this.dataStore.users.push(...response);
        this._usersArr.next(this.dataStore.users);
      });
  }

}
