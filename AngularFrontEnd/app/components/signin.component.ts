import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/checksignin.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router }	from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: 'app/templates/signin.html',
  styleUrls: ['app/styles/signin.css',"app/styles/bootstrap.min.css"]
})
export class SigninComponent implements OnInit { 

	user: any = {};
	isSignedin: any;
	constructor(
	private signinservice: SignInService,
	private router: Router
	) { }

	ngOnInit() {

		this.isSignedin = Cookie.get('SignedIn');
		if(this.isSignedin){
			this.router.navigate(['/home']);
		}
	}


	onSigninSubmit() {
			this.signinservice.Signin(this.user.username, this.user.password)
			.then(data => this.logincreatesession(data))
            .catch(error => console.log(error));
		}

	logincreatesession(requestresponse: any): void{
			if (requestresponse.msg == 'User Authenticated') {
				Cookie.set('SignedIn', 'true');
				Cookie.set('username', this.user.username);
				Cookie.set('token', requestresponse.token);
				location.reload();
			}
			else {
				alert(requestresponse);
			}

	}	
}
