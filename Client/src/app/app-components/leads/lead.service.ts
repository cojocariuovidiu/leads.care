import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { AppSettings } from '../.../framework-components/Settings/AppSettings';
// import { LeadModel } from '../../../../../Common/Models/LeadModel';

@Injectable()
export class LeadService {
    private EndpointBaseUrl = 'http://localhost:3000/api/' + 'Leads';

    constructor(private _httpClient: HttpClient) {
    } // public _appSettings: AppSettings

    public Search(searchModel: any): Observable<any> {
        return this._httpClient.post(`${this.EndpointBaseUrl}/Search`, searchModel);
    }

    public Get(leadId: number): Observable<any> {
        return this._httpClient.get(`${this.EndpointBaseUrl}/${leadId}`);
    }

    public Delete(leadId: number): Observable<any> {
        return this._httpClient.delete(`${this.EndpointBaseUrl}/${leadId}`);
    }

    public Save(model: any): Observable<any> {
        return this._httpClient.post(this.EndpointBaseUrl, model);
    }
}
