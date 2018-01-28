// import * as Guid from 'guid';
import { IModel } from './IModel';
export class BaseModel implements IModel {
    // public ModelRefKey?: string = Guid.raw();
    public ModelRefKey?: string = Math.random().toString(36).substr(2, 5);
}
