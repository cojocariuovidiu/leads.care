export class SearchDataRegistry {
    public static Instance: SearchDataRegistry = new SearchDataRegistry();
    private _searchCriteria: any;
    public GetSearchCriteria(): any {
        return this._searchCriteria;
    }
    public RegisterSearchCriteria(searchCriteria: any): void {
        this._searchCriteria = searchCriteria;
    }
    public ClearSearchCriteria(): void {
        this._searchCriteria = undefined;
    }
}
