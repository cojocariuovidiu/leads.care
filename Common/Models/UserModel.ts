import { MongoModel } from './MongoModel';

export class UserModel extends MongoModel {
    public UserId: number;
    public Name: string;
    public Email: string;
    public Username: string;
    public Password: string;
    public Status: number;
}
