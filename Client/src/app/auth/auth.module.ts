import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LeadsCommonModule } from '../app-components/common/common.module';

// angular mat
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';


import { AuthService } from '../auth.service';

import { AuthComponent } from './auth.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterModule,
        LeadsCommonModule
    ],
    exports: [],
    declarations: [
        AuthComponent
    ],
    providers: [AuthService],
})
export class AuthModule { }

