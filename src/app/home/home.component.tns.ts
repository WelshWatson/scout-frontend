import { Team } from './../models/team';
import { LocationService } from './../services/location-service';
import { TrackingData } from './../models/tracking-data';
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
    latitude = 0;
    longitude = 0;
    date: Date;
    teams: Team[] = [];
    locationTrackingEnabled = false;
    selectedTeam: number = null;


    constructor(private locationService: LocationService) {
        this.getTeams();
        this.showTime();
    }

    ngOnInit() { }

    selectedIndexChanged(event: any) {
        this.selectedTeam = this.teams[event.index].teamID;
        console.log(this.selectedTeam + ' team selected!');
    }

    getSelectedTeamMessage() {
        return this.teams[this.selectedTeam].teamName + ' team selected';
    }

    private getTeams(): void {
        console.log('getting teams...');
        this.locationService.getTeams().subscribe((x) => {
            if (x) {
                console.log('got teams!');
                console.log(x);
                this.teams = x;
            }
        }, (error) => {
            console.log(error);
        }
        );
    }

    private showTime() {
        setTimeout(() => {
            if (this.locationTrackingEnabled) {
                console.log('showTime function called');
                this.getAndSendLocation();
                this.date = new Date();
            }
            this.showTime();
        }, 30000);
    }

    getAndSendLocation() {
        this.locationTrackingEnabled = true;
        console.log('getting location...');
        geolocation.enableLocationRequest().then(x => {
            geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
                .then(res => {
                    console.log('got location!');
                    this.latitude = res.latitude;
                    this.longitude = res.longitude;
                    this.test = res.latitude + ',' + res.longitude;
                    this.sendTrackingData(this.selectedTeam, this.longitude.toString(), this.latitude.toString());
                });
        }).catch(exception => {
            this.test = exception;
        });
    }

    private sendTrackingData(teamId: number, longitude: string, latitude: string): void {
        const data = new TrackingData();
        data.teamId = teamId;
        data.longitude = longitude;
        data.latitude = latitude;

        console.log(data + ' posted!');
        this.locationService.postTrackingData(data).subscribe((result) => {
            if (result) {
                console.log('Tracking data saved.');
            }
        });
    }
}
