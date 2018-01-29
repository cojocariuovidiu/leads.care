import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from './app-settings';
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class AppSettingsGuard implements CanActivate {
    constructor(public _appSettings: AppSettings, public _appSettingsService: AppSettingsService) { }

    public canActivate(): Observable<boolean> | boolean {
        if (this._appSettings.isInitialized) {
            return true;
        }
        return this._appSettingsService.get().map(val => val ? true : false);
    }
}
