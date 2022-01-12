import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entity/User';
import { WebSocketService } from 'src/app/web-socket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  roomCode:any;
  name : any;
  user:User;
  errorMsg:string;
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  lengthOfCode = 40;
  constructor(private webSocket:WebSocketService,private router :Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  joinRoom()
  {
    this.user = new User();
    this.user.Name=this.name;
    this.user.Message= "";
    this.user.RoomId=this.roomCode;
    this.user.Point= "";
    if(typeof(this.name)=="undefined" || typeof(this.roomCode)=="undefined")
    {
        this.errorMsg="Please Enter Name and RoomId";
    }
      else
      {
          this.roomCode = this.roomCode.trim();
          //this.webSocket.join(this.user);
          localStorage.setItem("RoomCode",this.roomCode);
          localStorage.setItem("ThisUser",this.user.Name);
          this.joinRoomToServer();
          this.router.navigate(['PokerPage']);
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
