import { Injectable } from '@angular/core';
import { Registry } from '../../../../../Shared/Types/Registry';
// import { EnvironmentSettings } from './EnvironmentSettings';

@Injectable()
export class AppSettings extends Registry {

    public IsInitialized = false;

    public get Enums(): any { return this.Get('Enums'); }

    constructor() {
        super();
    }

    public setAll(dict: { [key: string]: any }) {
        for (const key in dict) {
            if (key) {
                this.Set(key, dict[key]);
            }
        }
    }
}
