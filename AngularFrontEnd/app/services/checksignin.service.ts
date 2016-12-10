import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignInService {

	
	private signupurl = 'http://localhost:8000/meetings/apisignup';
	constructor(private http: Http) {}


	Signup(username: string, password: string, name: string, email:string): Promise<any> {
	var body = 'username='+username+'&password='+password+'name='+name+'mail='+email;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http
		.post(this.signupurl, body, { headers: headers})
		.toPromise()
		.then(response => response.json())
		.catch(this.handleError);		
	}

	private signinurl = 'http://localhost:8000/meetings/apisignin';
	
	Signin(username: string, password: string): Promise<any> {
	var body = 'username='+username+'&password='+password;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http
		.post(this.signinurl, body, { headers: headers})
		.toPromise()
		.then(response => response.json())
		.catch(this.handleError);
	}

	private signouturl = 'http://localhost:8000/meetings/apisignout';
	

	Signout(username: string, token:string): Promise<any> {
	var body = 'username='+username+'&token='+token;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http
		.post(this.signouturl, body, { headers: headers})
		.toPromise()
		.then(response => response.json())
		.catch(this.handleError);
	}


	private handleError(error: any): Promise<any> {
	 console.error('An error Occured', error);
	 return Promise.reject(error.message || error);
	}


}


