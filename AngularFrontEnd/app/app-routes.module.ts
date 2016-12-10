import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { DashboardComponent }   from './components/dashboard.component';
import { HomeComponent }      	from './components/home.component';
import { SignupComponent }  	from './components/signup.component';
import { SigninComponent }  	from './components/signin.component';
import { AppComponent }			from './app.component';
import { AddMeetingComponent }			from './components/addmeeting.component';
import { SignOutComponent }			from './components/logout.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',     component: HomeComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'signin',  component: SigninComponent },
  { path: 'addmeeting', component: AddMeetingComponent},
  { path: 'logout', component: SignOutComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);