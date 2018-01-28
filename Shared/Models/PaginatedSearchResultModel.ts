import { BasePaginationModel } from './BasePaginationModel';
import { ISearchResultModel } from './ISearchResultModel';

export class PaginatedSearchResultModel extends BasePaginationModel {
    public TotalElements: number;
    public Content: any[];
}
