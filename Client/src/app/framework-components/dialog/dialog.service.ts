import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from './confirm/confirm.component';
import { WaitIndicatorComponent } from './wait-indicator/wait-indicator.component';
import { AlertDialogComponent } from './alert/alert.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) { }

    public alert(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<AlertDialogComponent>;

        dialogRef = this.dialog.open(AlertDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public custom(component: any, model?: any): Observable<any> {
        // const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(component);
        let dialogRef: MatDialogRef<any>;

        dialogRef = this.dialog.open(component);
        dialogRef.componentInstance.model = model;

        return dialogRef.afterClosed();
    }

    // public customDialog<TDialog>(component: any): MatDialogRef<TDialog> {
    //     const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(component);
    //     return this.dialog.open<TDialog>(component);
    // }

    public waitIndicator(message: string): MatDialogRef<WaitIndicatorComponent> {

        let dialogRef: MatDialogRef<WaitIndicatorComponent>;

        dialogRef = this.dialog.open(WaitIndicatorComponent);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.message = message;

        return dialogRef;
    }
}
