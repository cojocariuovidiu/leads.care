import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './app-settings';

@Injectable()
export class AppSettingsService {
    private _apiUrl = 'http://localhost:3000/api/' + 'AppSettings';
    public constructor(private _httpClient: HttpClient, public appSettings: AppSettings) { }

    public get(): Observable<boolean> {
        const appSettings = this.appSettings;
        return this._httpClient.get(this._apiUrl)
            .map((response: any) => response.json())
            .do(response => {
                appSettings.setAll(response);
                appSettings.IsInitialized = true;
                return true;
            });
    }
}
