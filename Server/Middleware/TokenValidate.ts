import { Middleware, Req, Res } from 'routing-controllers';
import { verify } from 'jsonwebtoken';
import { AppSettings } from '../../Server/Settings/AppSettings';

@Middleware()
export class TokenValidate {
    use(@Req() request: any, @Res() response: any, next ?: (err?: any) => any): any {
        verify(request.headers.token, AppSettings.SecretKey, (err: any, decodedToken: any) => {
            if (err) {
                return response.send({ title: 'error'});
            }
        });
        next();
    }
}
