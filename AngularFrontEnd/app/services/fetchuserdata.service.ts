import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class FetchmeetingsService {

//	host = "http://localhost:4984/"
//	db = "meetinggw/"
//	filter = "_changes?filter=sync_gateway/bychannel&channels="

	private fetchmeetingsurl = 'http://localhost:4984/meetinggw/_changes?filter=sync_gateway/bychannel&channels=bawaji94';
	//add parameters later

	constructor(private http: Http) {}

	getMeetings(): Promise<any> {
		return this.http
		.get(this.fetchmeetingsurl)
		.toPromise()
		.then(response => response.json())
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	 console.error('An error Occured', error);
	 return Promise.reject(error.message || error);
	}
}


