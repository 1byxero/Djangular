import { Component, OnInit } from '@angular/core';
import { Router }	from '@angular/router';

import { SignInService } from './services/checksignin.service';


@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation"><a routerLink="/home" routerLinkActive="active">Home</a></li>
            <li role="presentation" *ngIf="isLoggedIn"><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
            <li role="presentation"  *ngIf="!isLoggedIn"><a routerLink="/signup" routerLinkActive="active">Signup</a></li>
            <li role="presentation"  *ngIf="!isLoggedIn"><a routerLink="/signin" routerLinkActive="active">Sign In</a></li>
          </ul>
        </nav>
        <h3 class="text-muted">Sync-Meetings</h3>
      </div>
    <div class="container">
	<router-outlet></router-outlet>
  `,
  styleUrls: ['app/styles/bootstrap.min.css']
})

export class AppComponent implements OnInit{
	
	public isLoggedIn: boolean = false;

	//write method to check if loggedin onInit

	constructor(private checksigninservice: SignInService) { }

	ngOnInit() {
    	this.checksigninservice.checkSignin()
            .then(data => this.isLoggedIn = data)
            .catch(error => console.log(error));
    }
}
