import { Component, OnInit } from '@angular/core';
import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
    title = 'scout-frontend(Mobile)';
    test = 'text for testing';
    lat = 0;
    lon = 0;
    speed = 0;
    addr = '';


    constructor() {
     }

     getLocation() {
        geolocation.enableLocationRequest().then(x => {
            geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
                .then(res => {
                    this.lat = res.latitude;
                    this.lon = res.longitude;
                    this.speed = res.speed;

                    this.test = res.latitude + ',' + res.longitude;
                });
        }).catch(exception => {
            this.test = exception;
        });
     }
    ngOnInit() {
    }
}
