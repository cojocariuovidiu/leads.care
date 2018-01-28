import { ProfileModel } from '../Models/ProfileModel';
import { PaginatedSearchResultModel } from '../Models/PaginatedSearchResultModel';

export interface IProfileRepository {
    Search(): Promise<PaginatedSearchResultModel>
}
