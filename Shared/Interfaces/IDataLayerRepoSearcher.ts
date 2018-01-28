import { ISearchResultModel } from '../Models/ISearchResultModel';
import { PaginatedSearchResultModel } from '../Models/PaginatedSearchResultModel';

export interface IDataLayerRepoSearcher<TModel, TSearchCriteria, TSearchResult> {
    Search(searchCriteria: TSearchCriteria): Promise<TSearchResult>;
}
