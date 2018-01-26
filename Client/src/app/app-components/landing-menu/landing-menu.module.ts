import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';

import { LandingMenuComponent } from './landing-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HeaderModule
    ],
    exports: [],
    declarations: [
        LandingMenuComponent
    ],
    entryComponents: [],
    providers: [],
})
export class LandingMenuModule { }

