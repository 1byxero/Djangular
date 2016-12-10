import { NgModule }				from '@angular/core';
import { BrowserModule }		from '@angular/platform-browser';
import { RouterModule, Routes }	from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';



import { AppComponent } 		from './app.component';

import { SignupComponent }    from './components/signup.component';
import { SigninComponent }    from './components/signin.component';
import { DashboardComponent }	from './components/dashboard.component';
import { HomeComponent }	from './components/home.component';
import { routing }	from './app-routes.module';
import { FetchmeetingsService } from './services/fetchuserdata.service';
import { SignInService } from './services/checksignin.service';
import { AddMeetingComponent } from './components/addmeeting.component';
import { SignOutComponent } from './components/logout.component';


@NgModule({
  imports:      [ 
  	BrowserModule,
  	routing,
    HttpModule,
    FormsModule
  ],
  declarations: [ 
  	AppComponent,
  	DashboardComponent,
  	SignupComponent,
    SigninComponent,
  	HomeComponent,
    AddMeetingComponent,
    SignOutComponent
  	],
  bootstrap:    [ AppComponent ],
  providers: [ 
    FetchmeetingsService,
    SignInService
  ]

})
export class AppModule { }
