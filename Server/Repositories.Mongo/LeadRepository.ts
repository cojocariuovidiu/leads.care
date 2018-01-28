import { LeadModel } from '../../Shared/Models/LeadModel';
import { LeadSearchCriteriaModel } from '../../Shared/Models/LeadSearchCriteriaModel';
import { PhoneNumberModel } from '../../Shared/Models/PhoneNumberModel';
import { LeadsDictionaryModel } from '../../Shared/Models/LeadsDictionaryModel';
import { DictionarySearchResultModel } from '../../Shared/Models/DictionarySearchResultModel';
import { ILeadRepository } from '../../Shared/Interfaces/ILeadRepository';
import { StatusTypes } from '../../Shared/Enums/StatusTypes';
import { Strings } from '../../Shared/Strings';
import { LeadSchema } from '../Schema/Leads.Schema';
import { BadRequestError } from 'routing-controllers';
import { NotFoundError } from 'routing-controllers';
import { MongoErrors } from '../Framework/Error/MongoErrors';

export class LeadRepository implements ILeadRepository {
    public Get(leadId: number): Promise<LeadModel> {
        return new Promise<LeadModel>((resolve, reject) => {
            LeadSchema.findById(leadId, (err, lead) => {
                try {
                    if (err) {
                        let error: BadRequestError = { ...new BadRequestError(), ...MongoErrors.GetMongoError(err) };
                        throw error;
                    } else if (!lead) {
                        let error = new NotFoundError();
                        error.name = 'Lead not found';
                        error.message = 'Sorry, That lead can\'t be found.'
                        throw error;
                    }
                    resolve(lead.toObject());
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    public Search(searchCriteria: LeadSearchCriteriaModel): Promise<DictionarySearchResultModel> {
        return new Promise<DictionarySearchResultModel>((resolve, reject) => {
            let searchFilter = this.GetSearchFilter(searchCriteria);
            LeadSchema.find(searchFilter, (err: any, response: LeadModel[], numAffected: number) => {
                let model: DictionarySearchResultModel = new DictionarySearchResultModel();
                let leads = this.SortByNeighborhood(response, searchCriteria.Neighborhoods);
                let leadsDictionary = this.MapToLeadsDictionary(leads);
                model.TotalElements = leads.length;
                model.Content = leadsDictionary;
                resolve(model);
            }).lean();
        });
    }

    private MapToLeadsDictionary(leads: LeadModel[]): LeadsDictionaryModel {
        leads = this.SortAlphabetic(leads);
        let leadsDictionary = new LeadsDictionaryModel();
        for (let lead of leads) {
            lead.Phone.FormattedNumber = this.FormatPhoneNumber(lead.Phone);
            leadsDictionary.Item(lead.Name[0].toUpperCase()).push(lead);
        }
        return leadsDictionary;
    }

    private SortByNeighborhood(leads: LeadModel[], neighborhoods: string[]): LeadModel[] {
        let matchingLeads: LeadModel[] = [];
        if (neighborhoods && neighborhoods.length) {
            if (neighborhoods.indexOf(Strings.All) > -1) {
                return leads;
            }
            for (let i = 0; i < leads.length; i++) {
                for (let j = 0; j < neighborhoods.length; j++) {
                    if (leads[i] && leads[i].Neighborhoods.indexOf(neighborhoods[j]) > -1) {
                        matchingLeads.push(leads[i]);
                        leads[i] = null; // ensuring this lead doesn't get pushed into the array again
                    }
                }
            }
        } else {
            matchingLeads = leads;
        }
        return matchingLeads;
    }

    private SortAlphabetic(leads: LeadModel[]): LeadModel[] {
        return leads.sort((n1, n2) => {
            if (n1.Name > n2.Name) {
                return 1;
            }
            if (n1.Name < n2.Name) {
                return -1;
            }
            return 0;
        });
    }

    public Save(model: LeadModel): Promise<LeadModel> {
        if (model.LeadId) {
            return this.Update(model);
        } else {
            return this.SaveNew(model);
        }
    }

    private SaveNew(model: LeadModel): Promise<LeadModel> {
        return new Promise<LeadModel>((resolve, reject) => {
            let lead = new LeadSchema(model);
            lead.save((err, savedLead) => {
                try {
                    if (err) {
                        console.log(`Mongo err: ${err.toString()}`);
                        let error: BadRequestError = { ...new BadRequestError(), ...MongoErrors.GetMongoError(err) };
                        throw error;
                    }
                    console.log(`Saved Lead: ${savedLead.toString()}`);
                    resolve(savedLead.toObject());
                } catch (err) {
                    console.log(`Saving err: ${err.toString()}`);
                    reject(err);
                }
            });
        });
    }

    private Update(model: LeadModel): Promise<LeadModel> {
        return new Promise<LeadModel>((resolve, reject) => {
            if (model.Phone) {
                model.Phone.FormattedNumber = this.FormatPhoneNumber(model.Phone);
            }
            LeadSchema.findOneAndUpdate(
                { _id: model._id, __v: model.__v },
                { $set: model },
                { new: true, upsert: false },
                (err, lead) => {
                    try {
                        if (err) {
                            let error: BadRequestError = { ...new BadRequestError(), ...MongoErrors.GetMongoError(err) };
                            throw error;
                        }
                        resolve(lead.toObject());
                    } catch (err) {
                        reject(err);
                    }
                });
        });
    }

    public Delete(leadId: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            LeadSchema.findByIdAndRemove(leadId, (err, lead) => {
                resolve();
            });
        });
    }

    private GetSearchFilter(searchCriteria: LeadSearchCriteriaModel): any {
        let searchFilterObject: any = {};

        if (searchCriteria.Status === StatusTypes.Active) {
            searchFilterObject.Status = { $eq: searchCriteria.Status };
        }
        if (searchCriteria.UserId) {
            searchFilterObject.UserId = { $eq: searchCriteria.UserId };
        }
        if (searchCriteria.Name) {
            searchFilterObject.Name = new RegExp('^' + searchCriteria.Name.toLowerCase(), 'i');
        }
        if (searchCriteria.MoveInDate) {
            let moveInDateMin: Date = new Date(searchCriteria.MoveInDate);
            let moveInDateMax: Date = new Date(searchCriteria.MoveInDate);
            moveInDateMax.setDate(moveInDateMax.getDate() + 10);
            searchFilterObject.MoveInDate = { $gte: moveInDateMin, $lte: moveInDateMax };
        }
        if (searchCriteria.MaxBudget) {
            searchFilterObject.MaxBudget = { $eq: searchCriteria.MaxBudget };
        }
        if (searchCriteria.MaxBedrooms) {
            searchFilterObject.MaxBedrooms = { $gte: searchCriteria.MaxBedrooms };
        }

        return searchFilterObject;
    }

    private FormatPhoneNumber(numberModel: PhoneNumberModel): string {
        return '(' + numberModel.AreaCode + ')-' + numberModel.ExchangeCode + '-' + numberModel.SubscriberNumber;
    }
}
