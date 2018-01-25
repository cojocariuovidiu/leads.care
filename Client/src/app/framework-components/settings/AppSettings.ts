import { Injectable } from '@angular/core';
import { Registry } from '../Types/Registry';
import { EnvironmentSettings } from './EnvironmentSettings';

@Injectable()
export class AppSettings extends Registry {
    private static APP_SETTINGS_DEFAULTS: { [key: string]: any } = {
        ApiBaseUrl: EnvironmentSettings.ApiBaseUrl,
        AppTitle: EnvironmentSettings.AppTitle,
        LookupFilterDebounceMs: 100,
        AssetBasePath: 'Assets/',
        DefaultApplicationPath: 'index.html#/LeadsApp',
    };

    public IsInitialized = false;

    public get ApiBaseUrl(): string { return this.Get('ApiBaseUrl'); }
    public get LookupFilterDebounceMs(): number { return this.Get('LookupFilterDebounceMs'); }
    public get Enums(): any { return this.Get('Enums'); }
    public get AssetBasePath(): any { return this.Get('AssetBasePath'); }
    public get AssociatedAssetKey(): any { return this.Get('AssociatedAssetKey'); }
    public get ModuleId(): any { return this.Get('ModuleId'); }
    public get ApplicationMode(): any { return this.Get('ApplicationMode'); }
    public get DefaultApplicationPath(): any { return this.Get('DefaultApplicationPath'); }
    public get CacheableLookupTypes(): any { return this.Get('CacheableLookupTypes'); }

    constructor() {
        super();
        this.SetMany(AppSettings.APP_SETTINGS_DEFAULTS);
    }

    public SetMany(dict: { [key: string]: any }) {
        for (const key in dict) {
            if (key) {
                this.Set(key, dict[key]);
            }
        }
    }
}
