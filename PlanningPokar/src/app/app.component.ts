import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SocketExample';
  constructor(private webSocket : WebSocketService){
    
  }
  ngOnInit(): void {
    
  }
  JoinRoom(){
    this.webSocket.join({id:"NewRoom",Name:"Pawan"})
  }
  public doBeforeUnload() :void
  {
    
  }
  
}
