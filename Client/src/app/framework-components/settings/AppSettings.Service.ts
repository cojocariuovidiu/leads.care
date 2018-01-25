import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

// import { BaseService } from '../Vibrant/Core/Network/BaseService';
// import { SessionContext } from '../Vibrant/Core/Storage/SessionContext';
// import { Get } from '../Vibrant/Core/Network/Decorators/Request';
// import { HandleErrors } from '../Vibrant/Error/Errors';
// import { AppSettings } from './AppSettings';

@Injectable()
export class AppSettingsService {}
    // extends BaseService
    // {
    // constructor(public Http: Http, public SessionContext: SessionContext, public AppSettings: AppSettings) {
    //     super(Http, SessionContext);
    //     this.EndpointBaseUrl = this.AppSettings.ApiBaseUrl + 'AppSettings';
    // }

    // @HandleErrors()
    // @Get()
    // public Get(options?: RequestOptions): Observable<any> {
    //     let appSettings = this.AppSettings;
    //     return this.AuthenticatedRequest(options).map(response => response.json())
    //         .do(response => {
    //             appSettings.SetMany(response);
    //             appSettings.IsInitialized = true;
    //             return response;
    //         });
    // }
// }
