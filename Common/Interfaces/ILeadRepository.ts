import { IDataLayerRepoModifier } from './IDataLayerRepoModifier';
import { IDataLayerRepoSearcher } from './IDataLayerRepoSearcher';
import { LeadModel } from '../Models/LeadModel';
import { LeadSearchCriteriaModel } from '../Models/LeadSearchCriteriaModel';
import { DictionarySearchResultModel } from '../Models/DictionarySearchResultModel';

export interface ILeadRepository extends IDataLayerRepoModifier<number, LeadModel>,
    IDataLayerRepoSearcher<LeadModel, LeadSearchCriteriaModel, DictionarySearchResultModel> {
    Get(leadId: number): Promise<LeadModel>
    Delete(leadId: number): Promise<string>
}
