import { Component, OnInit } from '@angular/core';

import { LEVELS } from '../levelsMock';
import { Level } from '../level';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-level-home',
  templateUrl: './level-home.component.html',
  styleUrls: ['./level-home.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(+300%)' }),
        animate(500)
      ])

    ])
  ]
})
export class LevelHomeComponent implements OnInit {
  levels: Level[] = LEVELS;
  cards: Level[] = [];
  next: number = 0;
  unlocked: boolean[]= [];


  constructor(private service: UserService) {
    if (this.service.logged === true) {


      this.doNext();
    }else{
      console.log("please log in to play");
    }
for (let i = 0; i < this.service.loggedUser.unlocked; i++) {
  this.unlocked[i]= true;
  
}

  }

  ngOnInit() {

  }

  doNext() {
    if (this.next < this.levels.length) {
      this.cards.push(this.levels[this.next++]);

    }
  }

}
