import { NodeModel } from '../Models/NodeModel';
import { PaginatedSearchResultModel } from '../Models/PaginatedSearchResultModel';

export interface INodeRepository {
    Search(): Promise<PaginatedSearchResultModel>
}
