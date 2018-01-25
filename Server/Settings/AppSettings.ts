import { Req } from 'routing-controllers';
import { Request } from 'express';
const environmentSettings = require('../appSettings.json');
export class AppSettings {
    private static _registry: any = {};

    public static get IsDebugMode(): boolean { return AppSettings.Get('IsDebugModel'); }
    public static get IsProdMode(): boolean { return AppSettings.Get('IsProdMode'); }
    public static get Port(): number { return AppSettings.Get('Port'); }
    public static get VirtualIpAddress(): string { return AppSettings.Get('VirtualIpAddress'); }
    public static get IpAddress(): string { return AppSettings.Get('IpAddress'); }
    public static get SessionId(): string { return AppSettings.Get('SessionId'); }
    public static get Logging(): any { return AppSettings.Get('Logging'); }
    public static get SecretKey(): string { return AppSettings.Get('SecretKey'); }

    public static Get(key: string): any {
        return AppSettings._registry[key];
    }

    public static Set(key: string, value: any): void {
        AppSettings._registry[key] = value;
    }

    public static Update(dict: any): void {
        Object.keys(dict).forEach((key) => {
            AppSettings.Set(key, dict[key]);
        });
    }

    public static GetSnapshot(): any {
        return JSON.parse(JSON.stringify(AppSettings._registry));
    }
}
AppSettings.Update(environmentSettings);
