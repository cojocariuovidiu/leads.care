import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { AppSettings } from './framework-components/Settings/AppSettings';
import { UserBaseRequestModel } from '../../../Shared/Models/UserBaseRequestModel';

@Injectable()
export class AuthService {
    private EndpointBaseUrl = 'http://localhost:3000/api/' + 'User';

    constructor(public _httpClient: HttpClient) { } // public _appSettings: AppSettings

    public Login(credentials: UserBaseRequestModel): Observable<any> {
        return this._httpClient.post(`${this.EndpointBaseUrl}/Login`, credentials);
    }

    public Logout(request: UserBaseRequestModel): Observable<any> {
        return this._httpClient.post(`${this.EndpointBaseUrl}/Logout`, request);
    }

    public Signup(request: UserBaseRequestModel): Observable<any> {
        return this._httpClient.post(`${this.EndpointBaseUrl}/Signup`, request);
    }

    public IsLoggedIn(): boolean {
        return localStorage.getItem('Token') !== null;
    }
}
