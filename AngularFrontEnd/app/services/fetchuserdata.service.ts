import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class FetchmeetingsService {

	fetchmeetingsurl = "http://127.0.0.1:8000/meetings/apiviewmeetings";
	constructor(private http: Http) {}

	getMeetings(username: string, token: string): Promise<any> {
		var body = 'username='+username+'&token='+token;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http
			.post(this.fetchmeetingsurl, body, { headers: headers})
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	addmeetingsurl = "http://127.0.0.1:8000/meetings/apiaddmeet";

	addMeeting(username: string, token: string, meetdate: string, meettime: string, location: string, agenda: string) {
		var body = 'username='+username+'&token='+token+'&meetdate='+meetdate;
		body = body+'&meettime='+meettime+'&location='+location+'&agenda='+agenda;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http
			.post(this.addmeetingsurl, body, { headers: headers})
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
		
	}

	private handleError(error: any): Promise<any> {
	 console.error('An error Occured', error);
	 return Promise.reject(error.message || error);
	}
}


