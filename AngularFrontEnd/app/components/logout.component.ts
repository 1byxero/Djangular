import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/checksignin.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router }	from '@angular/router';

@Component({
  selector: 'sign-out',
  templateUrl: 'app/templates/signout.html',
  styleUrls: ['app/styles/signin.css','app/styles/bootstrap.min.css','app/styles/jumbotron.css']
})
export class SignOutComponent implements OnInit{ 

	user: any = {};
	username: string;
	token: string;
	isSignedin: any;

	constructor(
	private signinservice: SignInService,
	private router: Router
	) { }


	ngOnInit() {

		this.isSignedin = Cookie.get('SignedIn');
		if(this.isSignedin){
			this.username = Cookie.get('username');
			this.token = Cookie.get('token');

			this.signinservice.Signout(this.username, this.token)
				.then(data => this.destroysession(data))
	            .catch(error => console.log(error));
			
		}
		else{
			this.router.navigate(['/home']);
		}

	}

	destroysession(requestresponse: any): void{
			if (requestresponse == 'Signed out') {
				Cookie.deleteAll();
				location.reload();
			}
			else {
				alert(requestresponse);
			}

	}	
}
