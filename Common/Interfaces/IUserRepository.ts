import { UserResponseModel } from '../Models/UserResponseModel';
import { UserBaseRequestModel } from '../Models/UserBaseRequestModel';

export interface IUserRepository {
    Login(leadId: UserBaseRequestModel): Promise<UserResponseModel>
}
