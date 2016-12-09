import { Component } from '@angular/core';
import { SignInService } from '../services/checksignin.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'sign-in',
  templateUrl: 'app/templates/signin.html',
  styleUrls: ['app/styles/signin.css',"app/styles/bootstrap.min.css"]
})
export class SigninComponent  { 

	user: any = {};
	signinresponse: any ;

	constructor(private signinservice: SignInService) { }

	onSigninSubmit() {
			this.signinservice.Signin(this.user.username, this.user.password)
			.then(data => this.log(this.signinresponse = data))
            .catch(error => console.log(error));
		}

	log(data: any){
		console.log(data);
	}
}
