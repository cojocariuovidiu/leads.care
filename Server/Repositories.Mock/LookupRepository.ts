import { LookupSearchCriteriaModel } from '../../Shared/Models/LookupSearchCriteriaModel';
import { PaginatedSearchResultModel } from '../../Shared/Models/PaginatedSearchResultModel';
import { LookupItemModel } from '../../Shared/Models/LookupItemModel';
import { LookupTypes } from '../../Shared/Enums/LookupTypes';
import { SampleData } from './SampleData';

export class LookupRepository {
    public Search(searchCriteria: LookupSearchCriteriaModel): Promise<PaginatedSearchResultModel> {
        return new Promise<PaginatedSearchResultModel>((resolve, reject) => {
            const model = new PaginatedSearchResultModel();

            let retList: LookupItemModel[] = [];
            switch (searchCriteria.LookupTypeId) {
                case LookupTypes.Profile:
                    retList = SampleData.Instance.ProfilesLookupList;
                    break;
                case LookupTypes.Node:
                    retList = SampleData.Instance.NodesLookupList;
                    break;
                case LookupTypes.Status:
                    retList = SampleData.Instance.StatusLookupList;
                    break;
            }

            model.Content = retList;
            resolve(model);
        });
    }
}
