import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild
} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { Location } from '@angular/common';
import { LeadService } from '../Lead.Service';

import { LeadSearchCriteriaModel } from '../../../../../../Shared/Models/LeadSearchCriteriaModel';
import { Subscription } from 'rxjs/Subscription';
import { SearchDataRegistry } from '../../../framework-components/services/SearchDataRegistry';
import { LeadFormComponent } from '../../common/lead-form-component/lead-form.component';

@Component({
    moduleId: module.id,
    selector: 'pm-lead-search',
    templateUrl: 'lead-search.component.html',
    providers: [LeadService]
})
export class LeadSearchComponent implements OnInit, OnDestroy {
    @ViewChild(LeadFormComponent) public LeadForm: LeadFormComponent;
    private _modelChange: Subscription;
    public ResultsCount = 0;
    public Letters: any[];
    public SearchResults: any[] = [];
    public TotalElements = 0;
    public SearchCriteria: LeadSearchCriteriaModel = new LeadSearchCriteriaModel();

    constructor(
        private _location: Location,
        public Service: LeadService) {
    }

    public ngOnInit() {
        this._modelChange = this.LeadForm.Form.valueChanges.debounceTime(1000).subscribe(() => {
            this.Search();
        });
        if (SearchDataRegistry.Instance.GetSearchCriteria()) {
            this.LeadForm.LeadModel = SearchDataRegistry.Instance.GetSearchCriteria();
            this.LeadForm.AsyncInit();
        }
    }

    public SearchCriteriaChange(): void {
        this.Search();
    }

    public OnBackClicked() {
        this._location.back();
    }

    public ngOnDestroy() {
        this._modelChange.unsubscribe();
    }

    private Search(): void {
        this.SearchCriteria = this.LeadForm.LeadModel;
        this.SearchCriteria.UserId = +localStorage.getItem('UserId');
        this.Service.Search(this.SearchCriteria).subscribe(
            (res) => {
                this.SearchResults = res.Content;
                this.TotalElements = res.TotalElements;
                this.Letters = Object.keys(this.SearchResults);
            },
            undefined,
            () => {
                SearchDataRegistry.Instance.RegisterSearchCriteria(this.LeadForm.LeadModel);
            }
        );
    }

    public OnSearchClicked() {
        this.Search();
    }

    public OnClearSearchCriteria(): void {
        this.LeadForm.ClearAll();
        this.Search();
    }
}
