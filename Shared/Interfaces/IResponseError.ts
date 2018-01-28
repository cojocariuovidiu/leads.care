import { IMessageInfo } from './IMessageInfo';
export interface IResponseError {
    Title?: string;
    Message?: string;
    Details?: IMessageInfo[];
}
