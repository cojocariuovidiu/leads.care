import { LeadModel } from '../../../Shared/Models/LeadModel';
import { DataGeneratorHelper } from './../Helpers/DataGeneratorHelper';

export class LeadData {
    private randData: any = new DataGeneratorHelper();
    public CreateNew(model?: LeadModel, id?: number, name?: string, status?: string): LeadModel {
        let newModel: LeadModel = new LeadModel();
        newModel.Name = name || 'New asset with Id = ' + id;
        let d = new Date();
        d.setDate(d.getDate() - DataGeneratorHelper.RandomInteger(1, 3) * 10);
        newModel.MoveInDate = d;
        newModel.MaxBudget = DataGeneratorHelper.RandomInteger(1, 3) * 1000;
        newModel.MaxBedrooms = DataGeneratorHelper.RandomInteger(1, 4);
        newModel.Email = DataGeneratorHelper.RandomWords(1, 1) + '@' + DataGeneratorHelper.RandomWords(1, 1) + '.com';
        newModel.Status = DataGeneratorHelper.RandomInteger(1, 2);
        newModel.Notes = DataGeneratorHelper.RandomWords(20, 1);
        newModel.Phone = {
            AreaCode: DataGeneratorHelper.RandomInteger(201, 999),
            ExchangeCode: DataGeneratorHelper.RandomInteger(301, 999),
            SubscriberNumber: DataGeneratorHelper.RandomInteger(1000, 9999),
        }
        return newModel;
    }
}
