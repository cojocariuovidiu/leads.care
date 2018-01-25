const services = require('../services.json');

export class ServiceLocator {
    private static _instance: ServiceLocator;
    public static get Instance(): ServiceLocator {
        if (!ServiceLocator._instance) {
            ServiceLocator._instance = new ServiceLocator();
        }
        return ServiceLocator._instance;
    }

    private _registry: any = {};

    public constructor() {
        this.Initialize();
    }

    public Initialize(): void {
        for (let key in services) {
            let config = services[key],
                service: any = require(`../${config.path}`);
            if (service) {
                this.Set(key, service[config.name]);
            }
        }
    }

    public Get(key: string): any {
        let serviceClass: any = this._registry[key];
        return new serviceClass();
    }

    public Set(key: string, value: any): void {
        this._registry[key] = value;
    }
}
