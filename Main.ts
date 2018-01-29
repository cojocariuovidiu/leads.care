import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import * as express from 'express';
import * as Guid from 'guid';
import { verify } from 'jsonwebtoken';
import { Database } from './Server/Framework/Database';

import { AppSettings } from './Server/Settings/AppSettings';

let DB = new Database();
DB.Initialize();

let application: express.Express = createExpressServer({
    routePrefix: '/api',
    controllers: [__dirname + '/Server/Controllers/*.js'],
    developmentMode: false,
    errorOverridingMap: {
        ValidationError: {
            Title: 'Validation Error',
            Message: 'The request failed due to one or more validation errors.'
        }
    }
});

application.use(express.static('./Client/dist'));
application.use('/Common', express.static('Common'));
application.listen(3000);
