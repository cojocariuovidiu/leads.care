import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from './AppSettings';
import { AppSettingsService } from './AppSettings.Service';

@Injectable()
export class AppSettingsGuard implements CanActivate {
    constructor(public _appSettings: AppSettings, public _appSettingsService: AppSettingsService){}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
        if (this._appSettings.IsInitialized) {
        // if (true) {
            return true;
        }
        // return this._appSettingsService.Get().map(val => val ? true : false);
    }
}
