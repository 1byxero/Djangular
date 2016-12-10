import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

import { FetchmeetingsService } from '../services/fetchuserdata.service';

@Component({
  selector: 'addmeeting',
  templateUrl: 'app/templates/addmeeting.html',
  styleUrls: ['app/styles/signin.css','app/styles/bootstrap.min.css']
})  
export class AddMeetingComponent implements OnInit{
	
  addmeetingdata: any = {};

	constructor(
    private router: Router,
    private meetingservice: FetchmeetingsService
    ) { }

    ngOnInit() {
      let checklogincookie = Cookie.get('SignedIn');
      if(checklogincookie){
        console.log("null");
      }
      else{
      console.log("not null");
      this.router.navigate(['/signin']);
      }
    } 

    onAddclicked() {
      this.addmeetingdata.username = Cookie.get("username");
      this.addmeetingdata.token = Cookie.get("token");
      this.meetingservice.addMeeting(
        this.addmeetingdata.username,
        this.addmeetingdata.token,
        this.addmeetingdata.meetdate,
        this.addmeetingdata.meettime,
        this.addmeetingdata.meetilocation,
        this.addmeetingdata.agenda
        )
        .then(data => this.postAddmeeting(data))
        .catch(error => console.log(error));
    }

    postAddmeeting(requestresponse: any){
      //show response and update last_seq cookies
      console.log(requestresponse);
      if(requestresponse == 'Meeting successfully created'){
        alert(requestresponse);
        this.addmeetingdata = {};
        this.router.navigate(['/addmeeting']);
      }
      else {
        alert(requestresponse);
      }
    }
}
