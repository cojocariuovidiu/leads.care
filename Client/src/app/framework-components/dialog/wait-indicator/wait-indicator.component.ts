import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'wait-indicator-dialog',
    templateUrl: './wait-indicator.component.html'
})
export class WaitIndicatorComponent {
    public message: string;

    constructor(public dialogRef: MatDialogRef<WaitIndicatorComponent>) {

    }
}
