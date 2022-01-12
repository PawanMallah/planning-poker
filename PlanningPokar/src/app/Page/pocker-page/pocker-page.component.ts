import { Component, OnInit, HostListener } from '@angular/core';
import {User} from 'src/app/Entity/User'
import { WebSocketService } from 'src/app/web-socket.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pocker-page',
  templateUrl: './pocker-page.component.html',
  styleUrls: ['./pocker-page.component.css']
})
export class PockerPageComponent implements OnInit {

  ArtifactNumber: string;
  users : Array<User>;
  RoomCode : string;
  Message :string;
  isAdmin:boolean;
  static prevMessage:any;
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  lengthOfCode = 40;
  KeyDown()
  {
    
  }
  constructor(private webSocket:WebSocketService,private router:Router) { 
    try{
    this.joinRoom();
    $("#msgTextBox").click(function(){
      alert("hello");
    });
    this.users = new Array<User>();
    this.isAdmin = false;
    this.RoomCode=localStorage.getItem("RoomCode").toString();
    //this.users = [100];
    if(localStorage.getItem("AdminUser") != null)
    {
      this.isAdmin = true;
    }
    if(localStorage.getItem("AdminUser") != null)
    {
      var user = new User();
      user.Name=localStorage.getItem("AdminUser").toString();
      user.RoomId=localStorage.getItem("RoomCode").toString();
      this.users.push(user);
    }
    this.getAllUser();
    webSocket.GetAllMessage().subscribe((data)=>{
      console.log(data.DateTime);
      console.log(PockerPageComponent.prevMessage.DateTime);
      var msg = data.Message;
      var user=data.Name;
      if(msg == PockerPageComponent.prevMessage.Message && user == PockerPageComponent.prevMessage.Name){}
      else{
        $('#ChatMessage').append("<div style='width:90%;text-align:left;padding:10px;margin-left:5px;'><div style='font-size:8px'>"+data.Name+"</div><div style='border:1px solid black;display:inline-block;padding:5px;border-radius:5px'>"+data.Message+"</div></div><br>");
        var ChatDiv=document.getElementById("ChatMessage");
        PockerPageComponent.prevMessage=data;
        ChatDiv.scrollTop = ChatDiv.scrollHeight;
      }
    });
    webSocket.newUser().subscribe((data)=>{
      debugger;
      var checkUser  = this.users.findIndex(u=>u.Name == data.Name);
      if (checkUser == -1)
      {
      var user = new User();
      user.Message=data.Message;
      user.Name=data.Name;
      user.Point=data.Point;
      user.RoomId = data.RoomId;
      this.users.push(user);
      }
      webSocket.GetAll(parseInt(localStorage.getItem("RoomCode")));
      
      //data = JSON.parse(data);
        //console.log(data);
        // data.forEach(function(element){
        //     this.users.push(element);
        // });
        //this.users.push(data);
        //this.users= data;
        //console.log(this.users);
    });
    webSocket.GetAllPoint().subscribe((data)=>
    {
      
      if(data.Show == "yes")
      {
        $(".ShowPoint").css("background-color","white","color","black");
      }
    });
    webSocket.BroadcastArtifactNumber().subscribe((data)=>
    {
      this.ArtifactNumber = data.Number;
    });
  }catch(ex)
  {
    router.navigate(['']);
  }
  }
  getAllUser()
  {
    this.webSocket.GetAllUser().subscribe((data)=>{
      
      //this.users = data;
      //  data.array.forEach(element => {
      //     console.log(element);
      //  });
      this.users = new Array<User>();
       for (let index = 0; index < data.length; index++) {
         debugger;
         if(data[index].Id==localStorage.getItem("Myid").toString() && data[index].Admin == 1)
         {
           this.isAdmin = true;
         }

         this.users.push(data[index]);
       }
      //console.log(this.users);
    });
  }
  joinRoom():void
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

  ngOnInit(): void {
    this.isAdmin= false;
    PockerPageComponent.prevMessage = {Name:"",Message:"",DateTime:(new Date).toLocaleDateString()+' '+(new Date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}).toLowerCase()};
    if(localStorage.getItem("AdminUser") != null)
    {
      this.isAdmin = true;
    }
    
  }
   makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  

  canDeactivate(): Observable<boolean> | boolean {
    // debugger;
    // confirm("Please Enter")
    // var user = new User();
    // user.Id = localStorage.getItem("Myid");
    // user.RoomId = localStorage.getItem("RoomCode");
    // user.Name = localStorage.getItem("ThisUser");
    
    // this.webSocket.Remove(user);
    return true;
}


  // DayClick(day)
  // {

  //   var user = new User();
  //   user.Name=localStorage.getItem("ThisUser").toString();
  //   user.Point=day;
  //   user.RoomId = localStorage.getItem("RoomCode");
  //   this.users.find(a=>a.Name==localStorage.getItem("ThisUser").toString()).Point=day;  
  //   this.webSocket.UpdatePoint(user);
  // }
  DayClick(day,id)
  {
    $(".daybtnstyle").css("background-color","white");
    $("#"+id).css("background-color","#ffc67a");
    var user = new User();
    user.Name=localStorage.getItem("ThisUser").toString();
    user.Point=day;
    user.RoomId = localStorage.getItem("RoomCode");
    this.users.find(a=>a.Name==localStorage.getItem("ThisUser").toString()).Point=day;  
    this.webSocket.UpdatePoint(user);
  }
  browseTicket()
  {

  }
  SendMessage()
  {
    console.log("click");
    if(typeof(this.Message) != "undefined")
    {
      $('#ChatMessage').append("<div style='width:90%;float:right;display:right;padding:10px;margin-right:5px;border: 0px solid black;'><div style='width:fit-content;border: 1px solid black;margin-right:0;margin-left:auto;padding:5px;border-radius:5px;padding-left:10px;padding-right:10px'>"+this.Message+"</div></div><br>");
      var ChatDiv=document.getElementById("ChatMessage");
      ChatDiv.scrollTop = ChatDiv.scrollHeight;
      
      var userName = localStorage.getItem("ThisUser").toString();
      console.log((new Date).toLocaleDateString()+' '+(new Date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}).toLowerCase());
      this.webSocket.SendMessage({Name:userName,Message:this.Message,RoomId:this.RoomCode,DateTime:(new Date).toLocaleDateString()+' '+(new Date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})});
    }
  }
  BrowseArtifactClick()
  {
   // window.open("https://dev.azure.com/declic-devops/Declic/_workitems/edit/"+this.ArtifactNumber, "_blank");
  }
  ShowPointCall()
  {    
    $(".ShowPoint").css("background-color","white","color","black");
    this.webSocket.ShowPointCall({RoomId:this.RoomCode});
  }

  ClearPoint()
  {
    this.webSocket.ClearPointCall({RoomId:this.RoomCode});
    this.users.forEach ((value)=>{
      value.Point = null;
      
    })
  }

  changeArtifact()
  {
    this.webSocket.SendArtifactNumber({RoomId:this.RoomCode,Number:this.ArtifactNumber});
  }
}
