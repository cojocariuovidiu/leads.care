import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { DialogService } from '../dialog/dialog.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
    public constructor(private _dialogService: DialogService, private _router: Router) { }
    // private _waitModal: any;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this._waitModal = this._dialogService.waitIndicator('please wait...');
        const authReq = req.clone({
            headers: req.headers
                .set('Content-Type', 'application/json')
                .set('Client-Timezone-Offset', new Date().getTimezoneOffset().toString())
                .set('Token', localStorage.getItem('Token') ? localStorage.getItem('Token') : '')
        });
        return next.handle(authReq)
        .do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                } else {
                }
            },
            (err: any) => {
                // this._waitModal.close();
                if (err instanceof HttpErrorResponse) {
                    const error = err.error;
                    const message: string = error.message ? error.message : err.message;
                    const name: string = error.name ? error.name : err.statusText;
                    setTimeout(() => {
                        this._dialogService.alert(name, message).subscribe(() => {
                            if (err.status === 401) {
                                this._router.navigate(['']);
                            }
                        });
                    }, 500);
                }
            },
            () => {
                // this._waitModal.close();
            }
        );
    }
}
