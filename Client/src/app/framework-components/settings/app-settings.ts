import { Injectable } from '@angular/core';
import { Registry } from '../../../../../Shared/Types/Registry';
// import { EnvironmentSettings } from './EnvironmentSettings';

@Injectable()
export class AppSettings extends Registry {

    public isInitialized = false;

    public get enums(): any { return this.Get('Enums'); }
    public get constants(): any { return this.Get('Constants'); }

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
