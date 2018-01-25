import { BaseModel } from './BaseModel';

export class UserResponseModel extends BaseModel {
    public UserId: number;
    public Name: string;
    public UserRequestTypeId: number;
    public UserRequestTypeName: string;
    public Message: string;
    public Status: number;
    public Token: any;
}
