import { MongoModel } from './MongoModel';
import { PhoneNumberModel } from './PhoneNumberModel';

export class LeadModel extends MongoModel {
    public LeadId?: number = undefined;
    public UserId?: number = undefined;
    public Name?: string = undefined;
    public Email?: string = undefined;
    public Status?: number = undefined;
    public MoveInDate?: Date = undefined;
    public MaxBudget?: number = undefined;
    public MaxBedrooms?: number = undefined;
    public Phone?: PhoneNumberModel = undefined;
    public MobilePhone?: PhoneNumberModel = undefined;
    public HomePhone?: PhoneNumberModel = undefined;
    public OfficePhone?: PhoneNumberModel = undefined;
    public Neighborhoods?: string[] = [];
    public Notes?: string;
    public Initial?(): string {
        return this.Name.charAt(0);
    };
}
