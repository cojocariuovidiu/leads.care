import { Middleware, Req, Res } from 'routing-controllers';
import { verify } from 'jsonwebtoken';
import { AppSettings } from '../../Server/Settings/AppSettings';
import * as express from "express";

@Middleware()
export class TokenValidate {
    use(@Req() request: express.Request, @Res() response: express.Response, next?: (err?: any) => any): any {
        verify(request.headers.token, AppSettings.SecretKey, (err: any, decodedToken: any) => {
            if (err) {
                response.status(401);
                return response.send({ title: 'error', message: "Invalid session! Please log in again"});
            } else {
                next();
            }
        });
    }
}
