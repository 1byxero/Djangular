import { Component, OnInit } from '@angular/core';
import { Router }	from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { SignInService } from './services/checksignin.service';


@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation"><a routerLink="/home" routerLinkActive="active">Home</a></li>
            <li role="presentation" *ngIf="isLoggedIn"><a routerLink="/addmeeting" routerLinkActive="active">Add Meetings</a></li>
            <li role="presentation" *ngIf="isLoggedIn"><a routerLink="/dashboard" routerLinkActive="active">Show Meetings</a></li>
            <li role="presentation" *ngIf="isLoggedIn"><a routerLink="/logout" routerLinkActive="active">Log out</a></li>

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

export class AppComponent implements OnInit {
	
	public isLoggedIn: boolean = false;

	//write method to check if loggedin onInit
  ngOnInit(): void {
    let checklogincookie = Cookie.get('SignedIn');
    if(checklogincookie==='true'){
      this.isLoggedIn = (checklogincookie === 'true');
    }
  }
}
