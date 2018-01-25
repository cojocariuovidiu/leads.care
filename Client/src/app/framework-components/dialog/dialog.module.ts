import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { DialogService } from './dialog.service';

import { ConfirmDialogComponent } from './confirm/confirm.component';
import { AlertDialogComponent } from './alert/alert.component';
import { WaitIndicatorComponent } from './wait-indicator/wait-indicator.component';

@NgModule({
  declarations: [
      ConfirmDialogComponent,
      AlertDialogComponent,
      WaitIndicatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [ DialogService ],
  entryComponents: [
      ConfirmDialogComponent,
      AlertDialogComponent,
      WaitIndicatorComponent
  ]
})
export class DialogModule { }
