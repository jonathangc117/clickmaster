import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelHomeComponent } from './level/level-home/level-home.component';
import { PlayComponent } from './level/play/play.component';
import { HomeComponent } from './home/home/home.component';
import { InstructionsHomeComponent  } from  './instructions/instructions-home/instructions-home.component';
import { UnathorizedComponent} from './home/unathorized/unathorized.component';
import { AuthGuard }                from './auth-guard.service';
import { UserService } from './user.service';

const routes: Routes = [
  { path: 'levels', component: LevelHomeComponent,  canActivate: [AuthGuard] },
  { path: 'play/:id', component: PlayComponent,  canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'instructions', component: InstructionsHomeComponent  }, 
  { path: 'unauthorized', component:  UnathorizedComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  providers:[AuthGuard, UserService],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule { }
