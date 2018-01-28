import {Schema} from 'mongoose';
import { BaseModel } from './BaseModel';
export class MongoModel extends BaseModel {
    public readonly __v?: Schema.Types.Number = undefined;
    public readonly _id?: Schema.Types.Number = undefined;
}
