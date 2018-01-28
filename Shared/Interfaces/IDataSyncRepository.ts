import { DataSyncModel } from '../Models/DataSyncModel';

export interface IDataSyncRepository {
    GetUnsyncedLocalRecords(maxRecords: number): DataSyncModel;
    UpdateUnsyncedLocalRecords(recordKeys: any, transferDt: any): void;
    AddOrUpdateLocalRecords(dataSyncModel: DataSyncModel): void;
    AddOrUpdateRemoteRecords(dataSyncModel: DataSyncModel): void;
}
