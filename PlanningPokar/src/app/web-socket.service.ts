import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable, observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from 'querystring';
import { User } from './Entity/User';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket :any;
  //readonly url : string ='http://10.245.14.75/:1337';
  //readonly url : string ='http://localhost:8080';
  //readonly url : string ='http://planingserver.azurewebsites.net';
  readonly url :String = 'https://ct-planning-poker-server.herokuapp.com/';
  constructor() { 
    this.socket = io(this.url,{
      path:'/socket.io',
      secure:true,
      transports: ['websocket']});
  }
  join(data){
    this.socket.emit('join',data);
  }
  Remove(data){
    this.socket.emit('Remove',data);
  }
  newUser() :any
  {
    let  observable = new Observable<User>((response)=>{
      this.socket.on("newUserJoin",(data)=>{
        response.next(data);
      })
    });
    return observable;
  }
  GetAll(RoomId)
  {
    this.socket.emit("GetAll",RoomId);
  }
  GetAllUser() : Observable<any>
  {
    console.log("GetAllUserCall");
    let  observable = new Observable<any>((response)=>{
      this.socket.on("GetAllUser",(data)=>{
        response.next(data);
      })
    });
    return observable;
  }
  
  GetUpdatedPoint() : Observable<any>
  {
    let  observable = new Observable<any>((response)=>{
      this.socket.on("GetUpdatedPoint",(data)=>{
        response.next(data);
      })
    });
    return observable;
  }

  SendMessage(data)
  {
    this.socket.emit('SendMessage',data);
  }

  GetAllMessage() : Observable<any>
  {
    //let  observable = new Observable<any>();
    let  observable = new Observable<any>((response)=>{
      this.socket.on("GetAllMessage",(data)=>{
        console.log(data);
        response.next(data);
      })
    });
    // this.socket.on("GetAllMessage",(data)=>{
    //   console.log(data);
    //   return data;
    // });
    return observable;
  }
  
  UpdatePoint(data)
  {
    
      this.socket.emit('UpdatePoint',data);
  }

  RemoveUser(data)
  {    
    this.socket.emit('Remove',data);
  }

  ShowPointCall(data)
  {
    this.socket.emit('ShowPoint',data);
  }
  ClearPointCall(data)
  {
    this.socket.emit('ClearPoint',data);
    //this.GetAllUser();
  }
  RemovePoints()
  {
    
  }
  GetAllPoint() : Observable<any>
  {
    let  observable = new Observable<any>((response)=>{
      this.socket.on("ShowAllPoint",(data)=>{
        response.next(data);
      })
    });
    return observable;
  }
  SendArtifactNumber(data)
  {
    this.socket.emit('SendArtifactNumber',data);
  }
  BroadcastArtifactNumber() : Observable<any>
  {
    let  observable = new Observable<any>((response)=>{
      this.socket.on("BroadcastArtifactNumber",(data)=>{
        response.next(data);
      })
    });
    return observable;
  }
}
