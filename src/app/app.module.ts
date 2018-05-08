import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LevelHomeComponent } from './level/level-home/level-home.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlayComponent } from './level/play/play.component';
import { HomeComponent } from './home/home/home.component';
import {ProgressBarModule} from "ngx-progress-bar";
import { InstructionsHomeComponent } from './instructions/instructions-home/instructions-home.component';
import { LoginComponent } from './home/login/login.component';
import { UserService } from './user.service';
import { UnathorizedComponent } from './home/unathorized/unathorized.component';
import { LeaderboardComponent } from './home/leaderboard/leaderboard.component';
import { ModalComponent } from './home/login/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LevelHomeComponent,
    PlayComponent,
    HomeComponent,
    InstructionsHomeComponent,
    LoginComponent,
    UnathorizedComponent,
    LeaderboardComponent,
    ModalComponent
  ],
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ProgressBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
