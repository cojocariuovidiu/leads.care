import { LeadModel } from '../../Shared/Models/LeadModel';
import { LeadData } from './Data/Lead.Data';
import { LeadSearchCriteriaModel } from '../../Shared/Models/LeadSearchCriteriaModel';
import { DataGeneratorHelper } from './Helpers/DataGeneratorHelper';
import { Neighborhoods } from '../../Shared/Constants/Neighborhoods';
import { Strings } from '../../Shared/Strings';

import { LookupItemModel } from '../../Shared/Models/LookupItemModel';

export class SampleData {
    private static _instance: SampleData;
    public static get Instance(): SampleData {
        if (!SampleData._instance) {
            SampleData._instance = new SampleData();
        }
        return SampleData._instance;
    }

    private _profilesLookupList: LookupItemModel[];
    private _nodesLookupList: LookupItemModel[];
    private _statusLookupList: LookupItemModel[];

    // Leads
    private _leads: LeadModel[];
    public get Leads(): LeadModel[] {
        if (!this._leads) {
            this._leads = this.GenerateLeads();
        }
        return this._leads;
    }
    public set Leads(val) {
        this._leads = val;
    }

    private leadNames: string[] = ['Armen', 'Bob', 'Henry', 'Gino', 'Adrian', 'Petros', 'Didi', 'Sinbad'];
    public GenerateLeads(): LeadModel[] {
        let leadData: any = new LeadData();
        let leads: LeadModel[] = [];
        for (let i: number = 0; i < this.leadNames.length; i++) {
            let neighborhoods = Neighborhoods.filter((n) => {
                let randBool = n !== Strings.All && DataGeneratorHelper.RandomBoolean();
                return randBool;
            });
            if ( neighborhoods.length === 0) {
                neighborhoods.push(Strings.All);
            }
            let lead: LeadModel = leadData.CreateNew();
            lead.LeadId = i + 1;
            lead.Name = this.leadNames[i];
            lead.Neighborhoods = neighborhoods;
            leads.push(lead);
        }
        return leads;
    }

    public GetLeadSearchResults(searchCriteria: LeadSearchCriteriaModel): LeadModel[] {
        const leads: LeadModel[] = this.Leads.filter(function (lead) {
            const isMatch: boolean = (searchCriteria.Status === lead.Status || searchCriteria.Status === undefined) &&
                (searchCriteria.Name === lead.Name || searchCriteria.Name === undefined);
            return true; // isMatch;
        });
        return leads;
    }

    // Lookups
    // public get ProfilesLookupList(): LookupItemModel[] {
    //     if (!this._profilesLookupList) {
    //         this._profilesLookupList = LookupData.Instance.GetProfilesList();
    //     }
    //     return this._profilesLookupList;
    // }
    // public set ProfilesLookupList(val) {
    //     this._profilesLookupList = val;
    // }

    // Helper Methods
    public GetNextId(array: any[]): number {
        return array.sort(function (a, b) {
            a = a.Id;
            b = b.Id;
            return a > b ? 1 : a < b ? -1 : 0;
        })[array.length - 1].id + 1;
    }
}
