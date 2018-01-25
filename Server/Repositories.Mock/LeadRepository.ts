import { LeadModel } from '../../Common/Models/LeadModel';
import { LeadData } from './Data/Lead.Data';
import { PaginatedSearchResultModel } from '../../Common/Models/PaginatedSearchResultModel';
import { LeadSearchCriteriaModel } from '../../Common/Models/LeadSearchCriteriaModel';
import { SortFieldModel } from '../../Common/Models/SortFieldModel';
import { LeadsDictionaryModel } from '../../Common/Models/LeadsDictionaryModel';
import { DictionarySearchResultModel } from '../../Common/Models/DictionarySearchResultModel';
import { ILeadRepository } from '../../Common/Interfaces/ILeadRepository';
import { SortOrder } from '../../Common/Enums/SortOrder';
import { SampleData } from './SampleData';
import { Dictionary } from '../../Common/Types/Dictionary';
import { IterableDictionary } from '../../Common/Types/IterableDictionary';
import { ValidationError } from '../Framework/Error/ValidationError';
import { Logger } from '../Framework/Logging/Logger';

export class LeadRepository implements ILeadRepository {
    public Get(leadId: number): Promise<LeadModel> {
        return new Promise<LeadModel>((resolve, reject) => {
            const model: LeadModel = SampleData.Instance.Leads.filter(function (lead) {
                return lead.LeadId === leadId;
            })[0];
            resolve(model);
        });
    }

    public Search(searchCriteria: LeadSearchCriteriaModel): Promise<DictionarySearchResultModel> {
        return new Promise<DictionarySearchResultModel>((resolve, reject) => {
            let model: DictionarySearchResultModel = new DictionarySearchResultModel();
            let leads: LeadModel[] = SampleData.Instance.GetLeadSearchResults(searchCriteria);
            leads = this.FilterLeads(leads, searchCriteria);
            let leadsDictionary = this.MapToLeadsDictionary(leads);
            model.Content = leadsDictionary;
            resolve(model);
        });
    }

    private MapToLeadsDictionary(leads: LeadModel[]): LeadsDictionaryModel {
        leads = this.SortAlphabetic(leads);
        let leadsDictionary = new LeadsDictionaryModel();
        for (let lead of leads) {
            leadsDictionary.Item(lead.Initial().toUpperCase()).push(lead);
        }
        return leadsDictionary;
    }

    private SortFields(leads: LeadModel[], sortFields: SortFieldModel[]): LeadModel[] {
        sortFields = sortFields.sort(o => o.RankSeq);
        let sortedArray: LeadModel[] = leads;
        sortFields.forEach((sf) => {
            sortedArray = leads.sort((a, b) => {
                if (a > b) {
                    return sf.SortOrder === SortOrder.Ascending ? 1 : -1;
                }
                if (a < b) {
                    return sf.SortOrder === SortOrder.Ascending ? -1 : 1;
                }
                return 0;
            });
        });
        return sortedArray;
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

    public Save(model: LeadModel): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            // if (model.LeadId != null) {
            //     SampleData.Instance.Channels.find((channel) => {
            //         if (channel.id === model.LeadId) {
            //             let index = SampleData.Instance.Channels.indexOf(channel);
            //             SampleData.Instance.Channels[index] = { ...SampleData.Instance.Channels[index], ...model };
            //         }
            //         return channel.id === model.LeadId;
            //     });
            //     resolve(model.LeadId);
            // } else {
            //     let newModel = new LeadData().CreateNew(model);
            //     newModel.LeadId = SampleData.Instance.GetNextId(SampleData.Instance.Channels);
            //     SampleData.Instance.Channels.push(newModel);
            //     resolve(newModel.LeadId);
            // }

        });
    }

    public Delete(leadId: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            // SampleData.Instance.Channels.find((channel) => {
            //     if (channel.id === leadId) {
            //         const index = SampleData.Instance.Channels.indexOf(channel);
            //         SampleData.Instance.Channels.splice(index, 1);
            //     }
            //     return channel.id === leadId;
            // });
            resolve('success');
        });
    }

    private FilterLeads(leads: LeadModel[], searchCriteria: LeadSearchCriteriaModel): LeadModel[] {
        return leads.filter((lead) => {
            let isInDateRange: boolean = true;
            if (searchCriteria.MoveInDate) {
                let moveInDateMin: Date = new Date(searchCriteria.MoveInDate);
                let moveInDateMax: Date = new Date(searchCriteria.MoveInDate);
                moveInDateMax.setDate(moveInDateMax.getDate() + 10);

                let morethanmin = lead.MoveInDate >= moveInDateMin;
                let lessthanmax = lead.MoveInDate <= moveInDateMax;
                let both = lead.MoveInDate <= moveInDateMax && lead.MoveInDate >= moveInDateMin;
                if (lead.MoveInDate <= moveInDateMax && lead.MoveInDate >= moveInDateMin) {
                    isInDateRange = true;
                } else {
                    isInDateRange = false;
                }
            }

            return (searchCriteria.Name && lead.Name.toLocaleLowerCase().startsWith(searchCriteria.Name) || searchCriteria.Name === undefined)
                && (searchCriteria.MaxBudget <= lead.MaxBudget || searchCriteria.MaxBudget === undefined)
                && (searchCriteria.MaxBedrooms <= lead.MaxBedrooms || searchCriteria.MaxBedrooms === undefined)
                && isInDateRange;
        });
    }

    // Not implemented
    public CreateNew(): Promise<LeadModel> {
        throw new Error('Method not implemented.');
    }
}
