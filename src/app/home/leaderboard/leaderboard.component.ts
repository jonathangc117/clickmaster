import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { LEVELS } from '../../level/levelsMock';
import { Level } from '../../level/level';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @Input() users: User[];
  levels: Level[] = LEVELS;
  constructor() { }

  ngOnInit() {
    this.orderTableByUsers();

  }

  orderTableByUsers() {
    this.users.sort((a, b) => a.unlocked - b.unlocked);
    this.users.reverse();
    let sorted: User[] = [];
    let sort: User[] = [];
    let maxLvl: number = this.users[0].unlocked
    for (let h = 0; h <= maxLvl; h++) {
      sort = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].unlocked === h) {
          sort.push(this.users[i]);
        }
        sort.sort((a, b) => {
          let totalTimeA: number = 0;
          let totalTimeB: number = 0;
          for (let j = 0; j < a.userLevel.length; j++) {

            totalTimeA = totalTimeA + a.userLevel[j].time;

          }
          for (let k = 0; k < b.userLevel.length; k++) {

            totalTimeB = totalTimeB + b.userLevel[k].time;

          }
          return totalTimeA - totalTimeB;
        }

        );
        sort.reverse();
      }
      for (let n = 0; n < sort.length; n++) {
        sorted.push(sort[n]);

      }


    }
    this.users = sorted;
    this.users.reverse();
  }
}
