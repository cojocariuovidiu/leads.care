import { BaseModel } from './BaseModel';
import { SortFieldModel } from './SortFieldModel';

export class BasePaginationModel extends BaseModel {
    public PageSize: number;

    private _offset: number;
    public get Offset(): number { return this._offset; }
    public set Offset(value: number) { this._offset = value; }

    public get PageOffset(): number {
        return this.PageSize < 1 ? 0 : (this._offset / this.PageSize);
    }
    public set PageOffset(value: number) {
        if (this.PageSize > 0) {
            this._offset = value * this.PageSize;
        }
    }

    private _sortFields: SortFieldModel[];
    public get SortFields(): SortFieldModel[] {
        if (!this._sortFields) {
            this._sortFields = [];
        }
        return this._sortFields;
    }
    public set SortFields(value: SortFieldModel[]) {
        this._sortFields = value;
    }
}
