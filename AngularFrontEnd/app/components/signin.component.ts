import { Component } from '@angular/core';

import { SignInService } from '../services/checksignin.service';


@Component({
  selector: 'sign-in',
  templateUrl: 'app/templates/signin.html',
  styleUrls: ['app/styles/signin.css',"app/styles/bootstrap.min.css"]
})
export class SigninComponent  { 

	user: any = {};

	constructor(private signinservice: SignInService) { }

	onSigninSubmit() {
			this.signinservice.Signin(this.user.username, this.user.password)
			.then(data => console.log(data))
            .catch(error => console.log(error));
            //unsafe password should be hashed
		}
}
