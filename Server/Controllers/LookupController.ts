import { JsonController, Post, Body, QueryParam } from 'routing-controllers';
import { LookupTypes } from '../../Common/Enums/LookupTypes';
import { PaginatedSearchResultModel } from '../../Common/Models/PaginatedSearchResultModel';
import { LookupSearchCriteriaModel } from '../../Common/Models/LookupSearchCriteriaModel';
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
