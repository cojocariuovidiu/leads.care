import { BadRequestError } from 'routing-controllers';
import { IMessageInfo } from '../../../Shared/Interfaces/IMessageInfo';
import { IResponseError } from '../../../Shared/Interfaces/IResponseError';

export class ValidationError extends BadRequestError implements IResponseError {
    public Details: IMessageInfo[];
    public constructor(message?: string, details?: IMessageInfo[]) {
        super(message);
        this.Details = details;
        this.name = 'ValidationError';
    }
}
