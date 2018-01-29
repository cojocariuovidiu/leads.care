import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { AppSettings } from '../.../framework-components/Settings/AppSettings';
// import { LeadModel } from '../../../../../Shared/Models/LeadModel';

@Injectable()
export class LeadService {
    private _apiUrl= 'http://localhost:3000/api/' + 'Leads';

    constructor(private _httpClient: HttpClient) {
    } // public _appSettings: AppSettings

    public search(searchModel: any): Observable<any> {
        return this._httpClient.post(`${this._apiUrl}/Search`, searchModel);
    }

    public get(leadId: number): Observable<any> {
        return this._httpClient.get(`${this._apiUrl}/${leadId}`);
    }

    public delete(leadId: number): Observable<any> {
        return this._httpClient.delete(`${this._apiUrl}/${leadId}`);
    }

    public save(model: any): Observable<any> {
        return this._httpClient.post(this._apiUrl, model);
    }
}
