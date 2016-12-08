import { Component, OnInit } from '@angular/core';
import { FetchmeetingsService } from '../services/fetchuserdata.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/templates/dashboard.html',
  styleUrls: ['app/styles/navbar-static-top.css','app/styles/bootstrap.min.css']
})
export class DashboardComponent implements OnInit{
	

	constructor(private fetchmeetingsService: FetchmeetingsService) { }

	meetingsObject: any;

    ngOnInit() {
    	this.meetingsObject = this.fetchmeetingsService.getMeetings()
            .then(data => this.meetingsObject = data)
            .catch(error => console.log(error));
    } 
}
