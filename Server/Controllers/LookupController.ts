import { JsonController, Post, Body, QueryParam } from 'routing-controllers';
import { LookupTypes } from '../../Shared/Enums/LookupTypes';
import { PaginatedSearchResultModel } from '../../Shared/Models/PaginatedSearchResultModel';
import { LookupSearchCriteriaModel } from '../../Shared/Models/LookupSearchCriteriaModel';
import { LookupRepository } from '../Repositories.Mock/LookupRepository';

@JsonController('/Lookup')
export class LookupController {
    @Post('/Search')
    public Search(@Body() searchCriteria: LookupSearchCriteriaModel): Promise<PaginatedSearchResultModel> {
        let repository: LookupRepository = new LookupRepository();
        let response: Promise<PaginatedSearchResultModel> = repository.Search(searchCriteria);
        return response;
    }
}
