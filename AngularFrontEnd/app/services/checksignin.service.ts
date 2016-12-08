import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class SignInService {

	private checksigninurl = 'http://localhost:8000/meetings/checksignin';
	constructor(private http: Http) {}

	checkSignin(): Promise<any> {
		return this.http
		.get(this.checksigninurl)
		.toPromise()
		.then(response => response.json())
		.catch(this.handleError);
	}

	private signinurl = 'http://localhost:8000/meetings/signin';
	
	Signin(username: string, password: string): Promise<any> {
		return this.http
		.get(this.signinurl)
		.toPromise()
		.then(response => response.json())
		.catch(this.handleError);
	}



	private handleError(error: any): Promise<any> {
	 console.error('An error Occured', error);
	 return Promise.reject(error.message || error);
	}


}


