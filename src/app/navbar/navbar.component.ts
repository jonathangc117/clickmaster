import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarCollapsed: boolean = true;
  login: boolean = false;
  
  constructor(private service: UserService) {
    
   }

  ngOnInit() {
  }
  collapse(){
    this.navbarCollapsed = !this.navbarCollapsed;
    console.log(this.navbarCollapsed);
    if (this.navbarCollapsed ===true){
        this.login= false;
    } 
  }

}
