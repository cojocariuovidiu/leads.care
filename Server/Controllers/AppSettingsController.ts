import { JsonController, UseBefore, Get } from 'routing-controllers';
import { TokenValidate } from '../Middleware/TokenValidate';
import { Neighborhoods } from '../../Shared/Arrays/Neighborhoods';
const enums = require('../../Shared/Enums');

@JsonController('/AppSettings')
@UseBefore(TokenValidate)
export class AppSettingsController {
    @Get()
    public Get(): any {
        const appSettings: any = {};
        appSettings.Constants = {
            Neighborhoods: Neighborhoods
        };
        appSettings.Enums = enums;

        return appSettings;
    }
}
