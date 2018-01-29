import { JsonController, UseBefore, Get } from 'routing-controllers';
import { TokenValidate } from '../Middleware/TokenValidate';

@JsonController('/Leads')
@UseBefore(TokenValidate)
export class LeadController {
    @Get('')
    public Get(): any {
        
        return {};
    }
}
