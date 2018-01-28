import { IDictionary } from '../Interfaces/IDictionary';

export class Dictionary<T> implements IDictionary<T> {

    public ContainsKey(key: string): boolean {
        return this.hasOwnProperty(key);
    }

    public Add(key: string, value: T) {
        this[key] = value;
    }

    public Remove(key: string): T {
        let val = this[key];
        delete this[key];
        return val;
    }

    public Item(key: string): T {
        return this[key];
    }

    public Keys(): string[] {
        let keySet: string[] = [];

        for (let prop in this) {
            if (this.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }

        return keySet;
    }

    public Values(): T[] {
        let values: T[] = [];

        for (let prop in this) {
            if (this.hasOwnProperty(prop)) {
                values.push(this[prop]);
            }
        }

        return values;
    }
}
