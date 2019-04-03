import { map } from 'rxjs/operators';
import { User } from './../model/user.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.apiService.getAllUsers()
      .subscribe(arg => this.users = arg);

  }
  addUser() {
    this.router.navigate(['createUser']);
  }

  deleteUser(user: User) {
    this.apiService.deleteUser(user.id)
    .subscribe(
      data => {
        console.log(data);
        this.users = this.users.filter(u => u != user);
      }
    );
  }

  updateUser(user: User) {
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', user.id.toString());
    this.router.navigate(['updateUser']);
  }

}
