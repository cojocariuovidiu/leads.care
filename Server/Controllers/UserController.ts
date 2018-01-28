import { JsonController, Post, Body, QueryParam } from 'routing-controllers';
import { UserRepository } from '../Repositories.Mongo/UserRepository';
import { UserBaseRequestModel } from '../../Shared/Models/UserBaseRequestModel';
import { UserSignupRequestModel } from '../../Shared/Models/UserSignupRequestModel';
import { UserResponseModel } from '../../Shared/Models/UserResponseModel';

@JsonController('/User')
export class UserController {

    @Post('/Login')
    public Login( @Body() credentials: UserBaseRequestModel): Promise<UserResponseModel> {
        let repo = new UserRepository();
        let response: Promise<UserResponseModel> = repo.Login(credentials);
        return response;
    }

    @Post('/Signup')
    public Signup( @Body() credentials: UserSignupRequestModel): Promise<UserResponseModel> {
        let repo = new UserRepository();
        let response: Promise<UserResponseModel> = repo.Save(credentials);
        return response;
    }

    @Post('/Logout')
    public Logout( @Body() credentials: UserBaseRequestModel): Promise<UserResponseModel> {
        let repo = new UserRepository();
        let response: Promise<UserResponseModel> = repo.Logout(credentials);
        return response;
    }
}
