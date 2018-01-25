import { expect } from 'chai';
import { ISuiteCallbackContext } from 'mocha';
import * as mongoose from 'mongoose';
import { LeadSchema } from '../../Schema/Leads.Schema';
import { UserSchema } from '../../Schema/Users.Schema';
import { SampleData } from '../../Repositories.Mock/SampleData';
import { DictionarySearchResultModel } from '../../../Common/Models/DictionarySearchResultModel';
import { PhoneNumberModel } from '../../../Common/Models/PhoneNumberModel';
import { LeadModel } from '../../../Common/Models/LeadModel';
import { UserModel } from '../../../Common/Models/UserModel';
import { Database } from '../../Framework/Database';

describe('Server.LeadsDBInit', function () {
    this.timeout(3000);
    let sampleData = new SampleData();
    let DB = new Database();
    DB.Initialize();

    it('should enter several mock leads in Mongo', function (done) {
        // patchy code, needs to be refactored
        let leads = sampleData.GenerateLeads();
        let user = new UserModel();
        user.Name = 'nick';
        user.Username = 'nick';
        user.Password = 'nick';
        user.Email = 'n@n.com';
        let newUser = new UserSchema(user);
        newUser.save((err1, savedUser) => {
            for (let i: number = 0; i < leads.length; i++) {
                leads[i].UserId = <number><any>savedUser.UserId;
                let leadsModel = new LeadSchema(leads[i]);
                leadsModel.save((err2, savedLeads) => {
                    let s = savedLeads;
                });
            }
        });

    });
});
