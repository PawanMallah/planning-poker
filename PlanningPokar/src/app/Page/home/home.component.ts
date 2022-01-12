import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  CreateRoom()
  {
    console.log("Create Room Click");
    this.route.navigate(['CreateRoom']);
  }
  JoinRoom()
  {
    console.log("Join Room Click");
    this.route.navigate(['JoinRoom']);
  }
}
