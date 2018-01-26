import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { DialogService } from '../dialog/dialog.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    public constructor(private _dialogService: DialogService) { }
    private waitModal: any;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.waitModal = this._dialogService.waitIndicator('test');

        const authReq = req.clone({
            headers: req.headers
                .set('Content-Type', 'application/json')
                .set('Client-Timezone-Offset', new Date().getTimezoneOffset().toString())
                .set('Token', localStorage.getItem('Token') ? localStorage.getItem('Token') : '')
        });
        return next.handle(authReq).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // const e = event;
                }
            },
            (err: any) => {
                this.waitModal.close();
                if (err instanceof HttpErrorResponse) {
                    const error = JSON.parse(err.error);
                    const message: string = error.message ? error.message : err.message;
                    const name: string = error.name ? error.name : err.statusText;
                    setTimeout(() => {
                        this._dialogService.alert(name, message);
                    }, 1000);
                }
            },
            () => {
                this.waitModal.close();
            }
        );
    }
}
