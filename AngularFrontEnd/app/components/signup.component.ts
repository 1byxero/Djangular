import { Component } from '@angular/core';
import { Router }	from '@angular/router';

import { SignInService } from '../services/checksignin.service';

@Component({
  selector: 'sign-up',
  templateUrl: 'app/templates/signup.html',
  styleUrls: ['app/styles/signin.css',"app/styles/bootstrap.min.css"]
})
export class SignupComponent  { 

	private user: any = {}

	constructor(
	private signinservice: SignInService,
	private router: Router
	) { }


	OnSignUpClick(){
		this.signinservice.Signup(this.user.name, this.user.username, this.user.email, this.user.password)
            .then(data => this.redirectornot(data))
            .catch(error => console.log(error));
	}

	redirectornot(data: any): void{
		if(data == "User created successfully"){
			alert(data);
			this.router.navigate(['/signin']);
		}
		else{
			alert(data);
		}

	}



}
