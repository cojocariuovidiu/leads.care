import { ServiceLocator } from '../Framework/ServiceLocator';
import { IUserRepository } from '../../Shared/Interfaces/IUserRepository';
import { UserResponseModel } from '../../Shared/Models/UserResponseModel';
import { UserBaseRequestModel } from '../../Shared//Models/UserBaseRequestModel';

export class UserUnitOfWork {
    public Login(credentials: UserBaseRequestModel): Promise<UserResponseModel> {
        let repo: IUserRepository = ServiceLocator.Instance.Get('IUserRepository');
        return repo.Login(credentials).then((response: UserResponseModel) => {
            return response;
        });
    }
}
