import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LEVELS } from '../levelsMock'
import { Level } from '../level';
import { timer } from 'rxjs/observable/timer';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take, map } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import "rxjs/add/operator/finally";
import { UserService } from '../../user.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  animations: [
    trigger('buttonState', [
      state('inactive', style({

        transform: 'scale(1)'
      })),
      state('active', style({

        transform: 'scale(1.1)'
      })),
      transition('inactive <=> active', animate('50ms'))
      
    ])
  ]
})
export class PlayComponent implements OnInit, OnChanges {
  id = +this.route.snapshot.paramMap.get('id');
  level: Level[];
  text: string = "Ready?";
  endGame: boolean = false;
  win: boolean = false;
  secondText: string;
  key: string = "";//the key the user is presing
  buttons: number[] = [];//game buttons
  keys: string[] = [];
  states: string[] = [];

  x: number;//total number of clicks that the level has left
  ready: boolean = false;
  countDown;
  count: number;
  backgroundColor: string = "#eeeeee";
  finalCount: number;
  lastRecord: number;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    

  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardUp(event: KeyboardEvent) {
    this.key = "";

  }

  constructor(private route: ActivatedRoute, private service: UserService) {
    this.getLevel();
    
  }

  ngOnInit() {

  }
  ngOnChanges() {
    this.getLevel();

  }



  getLevel() {
    
    this.level = LEVELS.filter(h => (h.id === this.id));


  }
  startGame() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getLevel();

    this.lastRecord = this.service.loggedUser.userLevel[this.id-1].time;
    this.win = false;
    this.x = this.level[0].clicks;
    this.setButtons();
    this.changeClicks();
    this.startCountdownTimer();
    this.ready = true;
  }
  changeClicks() {
    let clicks = Math.floor(Math.random() * 4) + 1;
    if (clicks > this.x) {
      clicks = this.x;
    }
    let actualButton = Math.floor(Math.random() * this.level[0].buttons)
    this.buttons[actualButton] = clicks;
    for (let i = 0; i < this.level[0].buttons; i++) {

      this.keys[i] = "";

    }
    if (this.level[0].keys != 0) {
      let letter = Math.floor(Math.random() * this.level[0].keys) + 1;


      switch (letter) {
        case 1:
          this.keys[actualButton] = "a"
          break;
        case 2:
          this.keys[actualButton] = "s"
          break;
        case 3:
          this.keys[actualButton] = "d"
          break;
        case 4:
          this.keys[actualButton] = "f"
          break;
        default:
          this.keys[actualButton] = ""
      }
    }




  }
  setButtons() {

    for (let i = 0; i < this.level[0].buttons; i++) {
      this.buttons[i] = 0;
      this.keys[i] = "";
      this.states[i] = "inactive";

    }

  }
  buttonClicked(h: number, event) {
    if (this.buttons[h] === 0) {
      this.youLose();

    } else {
      if (this.keys[h] === this.key) {
        this.buttons[h]--;
        this.x--;
        if (this.buttons[h] < 0) {
          this.youLose();
          this.x++;
        } else {
          if (this.x === 0) {
            this.youWin();


          }
          if (this.buttons[h] === 0) {
            this.changeClicks();
          }
        }

      }
    }
  }
  youWin() {
    
    this.finalCount= this.level[0].time - this.count;
    this.secondText = "you win!";
    this.text = "play again";
    if(this.finalCount < this.service.loggedUser.userLevel[this.id - 1].time || this.service.loggedUser.userLevel[this.id - 1].time === 0 ){
      this.service.loggedUser.userLevel[this.id-1].time= this.finalCount;
      this.service.updateUser();
    }
    
    this.ready = false;
    this.win = true;
    if(this.service.loggedUser.unlocked === this.id){
      this.service.loggedUser.unlocked+=1;
      
      this.service.loggedUser.userLevel.push({id: this.id + 1 , time: 0 });
      this.service.updateUser();
    }
  
  }
  youLose() {
    this.finalCount= this.level[0].time - this.count;
    this.secondText = "you lose :(";
    this.text = "try again";
    this.ready = false;
    
    this.win = true;
  }

  startCountdownTimer() {
    this.count = this.level[0].time;
    this.countDown = Observable.timer(0, 1000).finally(() => {
      if(this.count === 0 && this.x > 0) {
        this.youLose();
      }
      }).pipe(
      take(this.count),
      map(() => --this.count)
      );
  }
  changeState(h: number) {
    this.states[h] = this.states[h] === 'active' ? 'inactive' : 'active';
    
  }
  refresh(){
    this.id = +this.route.snapshot.paramMap.get('id');
    
    this.text = "Ready?";
    this.endGame = false;
    this.win = false;
    
    
  }
}


