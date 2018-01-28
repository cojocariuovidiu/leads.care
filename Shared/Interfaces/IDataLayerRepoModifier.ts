export interface IDataLayerRepoModifier<TKey, TModel> {
    Delete(id: TKey, rowVersionId?: string): void;
    Save(model: TModel): Promise<TModel>;
}
