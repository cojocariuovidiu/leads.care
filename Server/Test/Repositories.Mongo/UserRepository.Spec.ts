import { expect } from 'chai';
import { ISuiteCallbackContext } from 'mocha';
import { UserRepository } from '../../Repositories.Mongo/UserRepository';
import { DictionarySearchResultModel } from '../../../Common/Models/DictionarySearchResultModel';
import { LeadSearchCriteriaModel } from '../../../Common/Models/LeadSearchCriteriaModel';
import { PhoneNumberModel } from '../../../Common/Models/PhoneNumberModel';
import { UserModel } from '../../../Common/Models/UserModel';
import { UserSignupRequestModel } from '../../../Common/Models/UserSignupRequestModel';
import { UserBaseRequestModel } from '../../../Common/Models/UserBaseRequestModel';
import { Strings } from '../../../Common/Strings';
import { Database } from '../../Framework/Database';

describe('Server.Repositories.Mongo.LeadRepository', function () {
    this.timeout(30000);
    let savedUser: UserModel;
    let repository: UserRepository = new UserRepository();
    let signupData = new UserSignupRequestModel();
        signupData.Name = 'Nick';
        signupData.Username = 'Nickiboy';
        signupData.Password = 'test';
    let DB = new Database();
    DB.Initialize();

    it('should save a user', function (done) {
        repository.Save(signupData).then((data) => {
            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('should log in the new user', function (done) {
        let credentials = new UserBaseRequestModel();
        credentials.Username = 'Nickiboy';
        credentials.Password = 'test';
        repository.Login(credentials).then((data) => {
            done();
        }).catch((err) => {
            throw err;
        });
    });
});
