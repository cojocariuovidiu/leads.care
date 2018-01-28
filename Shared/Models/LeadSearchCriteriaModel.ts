import { PhoneNumberModel } from './PhoneNumberModel';

export class LeadSearchCriteriaModel {
    public Status: number = undefined;
    public UserId: number = undefined;
    public Name: string = undefined;
    public MoveInDate: Date = undefined;
    public MaxBudget: number = undefined;
    public MaxBedrooms: number = undefined;
    public Neighborhoods: string[] = undefined;
    public Phone?: PhoneNumberModel = undefined;
}
