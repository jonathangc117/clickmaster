import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
users: User[] = [];
  constructor(private service: UserService) {

    this.service.getUsers();
    this.users= this.service.users;
   }

  ngOnInit() {
  }

}
