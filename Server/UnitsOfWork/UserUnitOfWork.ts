import { ServiceLocator } from '../Framework/ServiceLocator';
import { IUserRepository } from '../../Common/Interfaces/IUserRepository';
import { UserResponseModel } from '../../Common/Models/UserResponseModel';
import { UserBaseRequestModel } from '../../Common//Models/UserBaseRequestModel';

export class UserUnitOfWork {
    public Login(credentials: UserBaseRequestModel): Promise<UserResponseModel> {
        let repo: IUserRepository = ServiceLocator.Instance.Get('IUserRepository');
        return repo.Login(credentials).then((response: UserResponseModel) => {
            return response;
        });
    }
}
