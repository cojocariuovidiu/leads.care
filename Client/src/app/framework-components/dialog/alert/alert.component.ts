import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'alert-dialog',
    templateUrl: './alert.component.html'
})
export class AlertDialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {

    }
}
