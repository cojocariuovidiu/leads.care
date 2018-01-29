import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';

import { LeadsCommonModule } from '../common/common.module';

import { LeadService } from './Lead.Service';
import { SearchDataRegistry } from '../../framework-components/services/SearchDataRegistry';

import { MatExpansionModule, MatButtonModule } from '@angular/material';
import { LeadSearchComponent } from './lead-search/lead-search.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';
import { LeadLetterGroupComponent } from './lead-search/lead-letter-group/lead-letter-group.component';
import { LeadRowComponent } from './lead-search/lead-letter-group/lead-row/lead-row.component';
import { AppSettings } from '../../framework-components/settings/app-settings';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HeaderModule,
        ReactiveFormsModule,
        LeadsCommonModule,
        MatExpansionModule,
        MatButtonModule
    ],
    exports: [],
    declarations: [
        LeadSearchComponent,
        LeadRowComponent,
        LeadDetailComponent,
        LeadLetterGroupComponent
    ],
    entryComponents: [LeadSearchComponent],
    providers: [
        LeadService,
        AppSettings,
        SearchDataRegistry
    ]
})
export class LeadsModule { }

