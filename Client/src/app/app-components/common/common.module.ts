import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { LeadFormComponent } from './lead-form-component/lead-form.component';
import { PhoneFormComponent } from './phone-form-component/phone-form.component';
import { AppSettings } from '../../framework-components/settings/app-settings';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule
    ],
    exports: [
        LeadFormComponent,
        PhoneFormComponent
    ],
    declarations: [
        LeadFormComponent,
        PhoneFormComponent
    ],
    providers: [
        AppSettings
    ]
})
export class LeadsCommonModule { }

