import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/Entity/User';
import { WebSocketService } from 'src/app/web-socket.service';
import { Router } from '@angular/router';
import { noUndefined } from '@angular/compiler/src/util';
import { strict } from 'assert';
import { empty } from 'rxjs';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  errorMsg:string;
  roomCode:any;
  Name : any;
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  lengthOfCode = 40;
  user:User;
  constructor( private webSocket:WebSocketService,private router:Router) { 
   this.roomCode =Math.floor(Math.random() * (999999-100000) + 100000);
   console.log(this.roomCode); 
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  joinRoom()
  {
    this.user = new User();
    this.user.Name=this.Name;
    this.user.Message= "";
    this.user.RoomId=this.roomCode;
    this.user.Point= "";
    console.log(this.Name);
      if(typeof(this.Name) != "undefined")
      {
          //this.webSocket.join(this.user);
          localStorage.setItem("RoomCode",this.roomCode);
          localStorage.setItem("AdminUser",this.Name);
          localStorage.setItem("ThisUser",this.user.Name);
          this.joinRoomToServer();
          this.router.navigate(['PokerPage']);
      }
      else{
      this.errorMsg= "Please enter Your Name";
      }
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  joinRoomToServer():void
  {
    debugger;
    var user = new User();
    user.Id = this.makeRandom(this.lengthOfCode, this.possible);
    localStorage.setItem("Myid",user.Id);
    user.RoomId = localStorage.getItem("RoomCode");
    user.Name = localStorage.getItem("ThisUser");
    if(localStorage.getItem("AdminUser") != null)
    {
      user.Admin = 1;
    }
    this.webSocket.join(user);
  }
}
