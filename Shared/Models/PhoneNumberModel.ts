import { BaseModel } from './BaseModel';

export class PhoneNumberModel extends BaseModel {
    public AreaCode: number = undefined;
    public ExchangeCode: number = undefined;
    public SubscriberNumber: number = undefined;
    public FormattedNumber?: string;
}
