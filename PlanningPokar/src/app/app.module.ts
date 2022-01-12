import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Page/home/home.component';
import { CreateRoomComponent } from './Page/create-room/create-room.component';
import { JoinRoomComponent } from './Page/join-room/join-room.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { PockerPageComponent } from './Page/pocker-page/pocker-page.component'
import { DeActiveRoomGuard } from './Guard/de-active-room.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateRoomComponent,
    JoinRoomComponent,
    PockerPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    DeActiveRoomGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
