import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';



import { FetchmeetingsService } from '../services/fetchuserdata.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/templates/dashboard.html',
  styleUrls: ['app/styles/navbar-static-top.css','app/styles/bootstrap.min.css']
})
export class DashboardComponent implements OnInit{

	constructor( 
    private router: Router,
    private fetchdataservice: FetchmeetingsService
    ) { }

  username: string;
  token: string;
	meetingsObject: any;

    ngOnInit() {
      let checklogincookie = Cookie.get('SignedIn');
      if(checklogincookie){
        this.username = Cookie.get('username');
        this.token = Cookie.get('token');
        this.fetchMeetings();

      }
      else{
        this.router.navigate(['/signin']);
      }
    }

    fetchMeetings(){
      this.fetchdataservice.getMeetings(this.username, this.token)
        .then(data => this.showmeetingsandsavelastSeq(data))
        .catch(error => console.log(error));
    }

    showmeetingsandsavelastSeq(requestresponse: any){
      this.meetingsObject = requestresponse.documents;

      Cookie.set('last_seq',requestresponse.last_seq);
    }
}
