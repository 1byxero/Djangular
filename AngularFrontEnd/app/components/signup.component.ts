import { Component } from '@angular/core';

import { SignInService } from '../services/checksignin.service';

@Component({
  selector: 'sign-up',
  templateUrl: 'app/templates/signup.html',
  styleUrls: ['app/styles/signin.css',"app/styles/bootstrap.min.css"]
})
export class SignupComponent  { 

	private user: any = {}

	constructor(private signinservice: SignInService) { }


	OnSignUpClick(){
		this.signinservice.Signup(this.user.name, this.user.username, this.user.email, this.user.password)
            .then(data => console.log(data))
            .catch(error => console.log(error));
	}

}
