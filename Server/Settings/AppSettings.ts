const environmentSettings = require('../appSettings.json');
export class AppSettings {
    private static _registry: any = {};

    public static get Port(): number { return AppSettings.Get('Port'); }
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
}
AppSettings.Update(environmentSettings);
