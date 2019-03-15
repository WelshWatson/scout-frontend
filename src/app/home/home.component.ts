import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'scout-frontend';
  lat = 0;
    lon = 0;
    speed = 0;
    addr = '';


  constructor() { }

  ngOnInit() {
  }

  dropDownSelectedIndexChanged() {
    
  }
}
