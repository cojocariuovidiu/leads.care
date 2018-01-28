import { JsonController, Get } from 'routing-controllers';
import { TestModel } from '../../Shared/Models/TestModel';
import { TestRepository } from '../Repositories.Mock/TestRepository';

@JsonController('/Test')
export class TestController {
    @Get()
    public Get(): Promise<TestModel> {
        let repository: TestRepository = new TestRepository();
        let response: Promise<TestModel> = repository.Get();
        return response;
    }

    @Get('/Error')
    public Error(): Promise<any> {
        let repository: TestRepository = new TestRepository();
        let response: Promise<any> = repository.Error();
        return response;
    }
}
