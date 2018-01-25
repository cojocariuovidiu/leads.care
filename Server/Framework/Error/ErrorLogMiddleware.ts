import { ErrorMiddlewareInterface, MiddlewareGlobalAfter } from 'routing-controllers';
import * as Winston from 'winston';
import { Logger } from '../Logging/Logger';
import { CommunicationDirection } from '../Logging/CommunicationDirection';

@MiddlewareGlobalAfter()
export class ErrorLogMiddleware implements ErrorMiddlewareInterface {
    public error(error: any, request: any, response: any, next: (err?: any) => any): void {
        Logger.Instance.Error(error, this, CommunicationDirection.Input);
        next();
    }
}
