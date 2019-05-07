import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//import { Moment } from 'moment';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import 'rxjs/Rx';
import { shareReplay } from 'rxjs/operators';


class DecodedToken {
	exp: number = 0;
	username: string = '';
}

@Injectable()
export class AuthService { 
		
	private decodedToken;

	constructor(private http: HttpClient) {}

	private saveToken(token: string): string {
			//this.decodedToken = jwt.decode(token);

		localStorage.setItem('bwm_auth', token);
		localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

		return token;
	}


	private getExpiration() {
		return  moment(this.decodedToken.exp);
	}

		public register(userData: any): Observable<any>{
		return this.http.post('api/v1/users/register', userData)
		}

		public login(userData: any): Observable<any>{
		return this.http.post('api/v1/users/auth', userData).map(
			(token: string ) => this.saveToken(token) );
		}

		public logout() {
			localStorage.removeItem('bwm_auth');
		}

		 public isAuthenticated(): boolean {
		 return moment().isBefore(this.getExpiration());

		}
		

		
}