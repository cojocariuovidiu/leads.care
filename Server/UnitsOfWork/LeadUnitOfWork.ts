import { ServiceLocator } from '../Framework/ServiceLocator';
import { ILeadRepository } from '../../Common/Interfaces/ILeadRepository';
import { LeadModel } from '../../Common/Models/LeadModel';
import { LeadSearchCriteriaModel } from '../../Common/Models/LeadSearchCriteriaModel';
import { DictionarySearchResultModel } from '../../Common/Models/DictionarySearchResultModel';

export class LeadUnitOfWork {
    public Get(leadId: number): Promise<any> {
        let repo: ILeadRepository = ServiceLocator.Instance.Get('ILeadRepository');

        return repo.Get(leadId).then((lead: LeadModel) => {
            return lead;
        });
    }

    public Save(lead: LeadModel): Promise<any> {
        let repo: ILeadRepository = ServiceLocator.Instance.Get('ILeadRepository');
        return repo.Save(lead).then((savedLead) => {
            return savedLead;
        });
    }

    public Search(searchCriteria: LeadSearchCriteriaModel): Promise<any> {
        let repo: ILeadRepository = ServiceLocator.Instance.Get('ILeadRepository');

        return repo.Search(searchCriteria).then((results: DictionarySearchResultModel) => {
            return results;
        });
    }

    public Delete(leadId: number): Promise<any> {
        let remoteRepo: ILeadRepository = ServiceLocator.Instance.Get('ILeadRepository');

        return remoteRepo.Delete(leadId).then(() => { });
    }
}
