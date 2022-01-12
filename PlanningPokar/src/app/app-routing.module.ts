import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Page/home/home.component';
import { CreateRoomComponent } from './Page/create-room/create-room.component';
import { JoinRoomComponent } from './Page/join-room/join-room.component';
import { PockerPageComponent } from './Page/pocker-page/pocker-page.component';
import { DeActiveRoomGuard } from './Guard/de-active-room.guard';


const routes: Routes = [
  {
    path:"Home",component:HomeComponent
  },
  {
    path:"",component:HomeComponent
  },
  {
    path:"CreateRoom",component:CreateRoomComponent
  },
  {
    path:"JoinRoom",component:JoinRoomComponent
  },
  {
    path:"PokerPage",component:PockerPageComponent,canDeactivate : [DeActiveRoomGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
