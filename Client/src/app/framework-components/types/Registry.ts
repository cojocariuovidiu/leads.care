export class Registry {
    protected _registry: any;

    constructor() {
        this.Clear();
    }

    public Get(key: string): any {
        return this._registry[key];
    }

    public Set(key: string, value: any): void {
        this._registry[key] = value;
    }

    public Has(key: string): boolean {
        return this._registry[key] ? true : false;
    }

    public Remove(key: string): void {
        delete this._registry[key];
    }

    public Clear(): void {
        this._registry = {};
    }

    public GetKeys(): string[] {
        return Object.keys(this._registry);
    }
}
