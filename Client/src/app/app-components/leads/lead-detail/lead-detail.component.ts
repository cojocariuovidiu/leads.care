import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { LeadService } from '../Lead.Service';
import { LeadModel } from '../../../../../../Common/Models/LeadModel';
import { Neighborhoods } from '../../../../../../Common/Arrays/Neighborhoods';
import { LookupTypes } from '../../../../../../Common/Enums/LookupTypes';
import { LeadFormComponent } from '../../common/lead-form-component/lead-form.component';

@Component({
    moduleId: module.id,
    selector: 'lead-detail',
    templateUrl: 'lead-detail.component.html',
    providers: [LeadService]
})
export class LeadDetailComponent implements OnInit {
    @ViewChild(LeadFormComponent) public LeadForm: LeadFormComponent;
    public Title: string;
    public EditingContext: any = new LeadModel();
    public IsNew: boolean;
    public Lead: LeadModel;
    public IsEditable: boolean;
    public KeyId: number;
    public LookupTypes = LookupTypes;
    public Neighborhoods = Neighborhoods;
    public RequestInProgress = false;
    public NeighborhoodsCheckboxObject: { [key: string]: boolean } = {};

    public constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location,
        public Service: LeadService) { }

    public OnBackClicked() {
        this._location.back();
    }

    public ngOnInit() {
        this._route.params.forEach((params: Params) => {
            this.KeyId = +params['leadId'];
            this.IsNew = this.KeyId === 0;
            if (!this.IsNew) {
                this.Service.Get(this.KeyId).subscribe(
                    (res) => {
                        this.EditingContext = res;
                        this.LeadForm.LeadModel = this.EditingContext;
                        this.LeadForm.AsyncInit();
                        this.Lead = res;
                        this.RequestInProgress = false;
                    });
            }
        });
    }

    public SaveLead() {
        this.RequestInProgress = true;
        this.LeadForm.LeadModel.UserId = +localStorage.getItem('UserId');
        this.EditingContext = this.LeadForm.LeadModel;
        this.Service.Save(this.EditingContext).subscribe(() => {
            this.RequestInProgress = false;
            this._router.navigate(['./leads']);
        });
    }

    public SearchCriteriaChange(): void {}
}
