import { ValidationError } from '../Framework/Error/ValidationError';
import { Logger } from '../Framework/Logging/Logger';
export class TestRepository {
    // public Get(): Promise<TestModel> {
    //     Logger.Instance.Debug('This is a debug message', this);
    //     Logger.Instance.Info('This is an info message', this);
    //     Logger.Instance.Warn('This is a warning message', this);
    //     return new Promise<TestModel>((resolve, reject) => {
    //         let model: TestModel = new TestModel();
    //         model.Foo = 'Hello World';
    //         model.Bar = 7;
    //         resolve(model);
    //     });
    // }

    // public Error(): Promise<any> {
    //     return new Promise<any>((resolve, reject) => {
    //         throw new ValidationError('The request was bad.', [
    //             {
    //                 ModelRefKey: 'ahfdjklafhdksj',
    //                 MessageTypeId: 1,
    //                 Message: 'This field is invalid.',
    //                 PropertyName: 'Name'
    //             }
    //         ]);
    //     });
    // }
}
