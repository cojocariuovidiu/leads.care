import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { LeadFormComponent } from './lead-form-component/lead-form.component';
import { PhoneFormComponent } from './phone-form-component/phone-form.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MyDatePickerModule
    ],
    exports: [
        LeadFormComponent,
        PhoneFormComponent
    ],
    declarations: [
        LeadFormComponent,
        PhoneFormComponent
    ]
})
export class LeadsCommonModule { }

