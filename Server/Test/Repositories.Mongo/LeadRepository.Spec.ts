import { expect } from 'chai';
import { ISuiteCallbackContext } from 'mocha';
import { LeadRepository } from '../../Repositories.Mongo/LeadRepository';
import { DictionarySearchResultModel } from '../../../Shared/Models/DictionarySearchResultModel';
import { LeadSearchCriteriaModel } from '../../../Shared/Models/LeadSearchCriteriaModel';
import { PhoneNumberModel } from '../../../Shared/Models/PhoneNumberModel';
import { LeadModel } from '../../../Shared/Models/LeadModel';
import { Strings } from '../../../Shared/Strings';
import { Database } from '../../Framework/Database';

describe('Server.Repositories.Mongo.LeadRepository', function () {
    this.timeout(30000);
    let savedLead: LeadModel;
    let initialName: string = 'Ghengis';
    let initialPhone: PhoneNumberModel = { AreaCode: 222, ExchangeCode: 333, SubscriberNumber: 4444 };
    let modifiedName: string = 'A different Ghengis';
    let modifiedPhone: PhoneNumberModel = { AreaCode: 347, ExchangeCode: 231, SubscriberNumber: 9876 };
    let initialNeighborhoods = [ Strings.All ];
    let modifiedNeighborhoods = [ Strings.Brooklyn, Strings.Manhattan ];
    let repository: LeadRepository = new LeadRepository();
    let DB = new Database();
    DB.Initialize();

    it('should search channels', function (done) {
        let searchCriteria = new LeadSearchCriteriaModel();
        searchCriteria.Neighborhoods = [ Strings.Manhattan ];
        repository.Search(searchCriteria).then((data) => {
            let leads = data as DictionarySearchResultModel;
            expect(leads).not.to.be.null;
            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('should save and return a saved channel model', function (done) {
        let newLead: LeadModel = {
            ModelRefKey: '22',
            Name: initialName,
            MoveInDate: new Date(),
            MaxBudget: 200000,
            MaxBedrooms: 3,
            Phone: initialPhone,
            Neighborhoods: initialNeighborhoods
        };
        repository.Save(newLead).then((data) => {
            if (data) {
                savedLead = data;
                expect(data.Name).to.equal(initialName, `Lead name is not ${initialName}`);
            }
            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('should get the newly saved lead', function (done) {
        repository.Get(savedLead.LeadId).then((data) => {
            expect(data).not.to.be.null;
            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('should modify an existing model', function (done) {
        const modifiedLead = savedLead;
        modifiedLead.Name = modifiedName;
        modifiedLead.Phone = modifiedPhone;
        modifiedLead.Neighborhoods = modifiedNeighborhoods;
        repository.Save(modifiedLead).then((data) => {
            expect(data).not.to.be.null;
            if (data) {
                expect(data.Name).to.equal(modifiedName, `Lead name is not modified to ${modifiedName}`);
            }
            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('should delete the saved lead', function (done) {
        repository.Delete(savedLead.LeadId).then((data) => {
            repository.Get(savedLead.LeadId).then((response) => {
                if (response) {
                    expect(response).to.be.null;
                    done();
                }
            }).catch((err) => {
                DB.Dispose();
                done();
                // throw err;
            });
        })
    });
});
