import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";
  user: User[] = [];
  users: User[] = [];
  logged: boolean= false;
  incorrect: string;
  constructor(private service: UserService) { }
  

  ngOnInit() {
  }
  login() {
    
    
   

this.service.login(this.userName, this.password);

  
  }

 
  setUser() {
    
    this.incorrect = this.service.setUser(this.userName, this.password);
    
   
  }


}
