import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { User } from './user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Injectable()
export class UserService  {


  users: User[] = [];
  user: User[] = [];
  logged: boolean;
  incorrect: string;
  loggedUser: User;
  redirectUrl: string;
  currentUrl: string;
  currentUrlId: number = 0;


  constructor(location: Location, router: Router) { 

    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.currentUrl = location.path();
        if(this.currentUrl.indexOf("play")>=0){
           this.currentUrlId=+this.currentUrl.slice(6);
        }
        
      } else {
        this.currentUrl = 'Home'
      }
    });
  }
  

  setUser(userName: string, password: string) {

    if (userName !== "" && password !== "") {

      this.getUsers();

      if (!this.user[0]) { //if users the users[0] doesent exist it enters
        this.user[0] = new User;
      }

      if (!this.users) {//if users the users array doesent exist it enters 
        this.user[0].id = 1;
        this.users = [];
      } else {
        this.user[0].id = this.users.length + 1;
      }

      this.user[0].name = userName;
      this.user[0].password = password;
      this.user[0].unlocked = 1;
      this.user[0].userLevel = [{id: 1, time: 0}];

      this.users.push(this.user[0]);

      localStorage.setItem('users', JSON.stringify(this.users));
      return "";
    } else {
      return this.incorrect = "all fields required";
    }
  }

  login(userName: string, password: string) {
    if (userName !== "" && password !== "") {

      this.getUsers();
      if (this.users) {

        this.user = this.users.filter(h => h.name === userName && h.password === password);
        if (this.user[0]) {
          this.loggedUser= this.user[0];
          this.logged = true;
          this.incorrect= "logged succesfully";
        } else {

          this.incorrect = "incorrect name or password";

        }
      } else {
        this.incorrect = "user not found";
      }
    } else {
      this.incorrect = "all fields required";
    }
  }

  getUsers() {
    this.users = [];
    this.users = JSON.parse(localStorage.getItem('users'));

  }

  updateUser(){
    this.getUsers();
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].id===this.loggedUser.id){
        this.users[i]=this.loggedUser;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
      
    }

  }



}
