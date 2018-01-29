import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Neighborhoods } from '../../../../../../Shared/Constants/Neighborhoods';
import { StatusTypes } from '../../../../../../Shared/Enums/StatusTypes';
import { LeadSearchCriteriaModel } from '../../../../../../Shared/Models/LeadSearchCriteriaModel';
// import { LeadModel } from '../../../../../../Shared/Models/LeadModel';
import { PhoneNumberModel } from '../../../../../../Shared/Models/PhoneNumberModel';

@Component({
    moduleId: module.id,
    selector: 'pm-lead-form',
    templateUrl: 'lead-form.component.html'
})
export class LeadFormComponent implements OnInit {
    @Input() public SearchMode = false;
    @ViewChild('LeadForm') Form: NgForm;
    @Output() public LeadChange = new EventEmitter<LeadSearchCriteriaModel>();
    public LeadModel = new LeadSearchCriteriaModel();
    public Neighborhoods: string[] = Neighborhoods;
    public StatusTypes = StatusTypes;
    public NeighborhoodsCheckboxObject: { [key: string]: boolean } = {};
    constructor() { }

    public ngOnInit(): void {
        this.LeadModel.Neighborhoods = this.LeadModel.Neighborhoods ? this.LeadModel.Neighborhoods : [];
        this.LeadModel.Phone = this.LeadModel.Phone ? this.LeadModel.Phone : new PhoneNumberModel();
        this.SetInitialStatus();
    }

    public AsyncInit(): void {
        this.SetNeighborhoodCheckboxes();
    }

    public ClearAll(): void {
        this.LeadModel = new LeadSearchCriteriaModel();
        this.LeadModel.Neighborhoods = [];
        this.ResetNeighborhoodCheckboxes();
    }

    public OnChange(): void {
        if (this.Form.valid) {
            this.LeadChange.emit(this.LeadModel);
        }
    }

    private SetInitialStatus(): void {
        if (this.LeadModel.Status === undefined) {
            this.LeadModel.Status = this.StatusTypes.Inactive;
        }
    }

    private SetNeighborhoodCheckboxes(): void {
        for (let i = 0; i < this.LeadModel.Neighborhoods.length; i++) {
            const n = this.LeadModel.Neighborhoods[i];
            this.NeighborhoodsCheckboxObject[n] = true;
        }
    }

    private ResetNeighborhoodCheckboxes(): void {
        for (let i = 0; i < this.Neighborhoods.length; i++) {
            this.NeighborhoodsCheckboxObject[this.Neighborhoods[i]] = false;
        }
    }

    public PushNeighborhood(e: any): void {
        if (e.target.checked) {
            this.LeadModel.Neighborhoods.push(e.target.value);
        } else {
            this.LeadModel.Neighborhoods.splice(this.LeadModel.Neighborhoods.indexOf(e.target.value), 1);
        }
        this.LeadChange.emit(this.LeadModel);
    }

    public IsValid(): boolean {
        const isValid: boolean = this.LeadModel.Neighborhoods !== undefined &&
            this.LeadModel.Neighborhoods.length &&
            this.LeadModel.MoveInDate !== undefined  &&
            this.LeadModel.Name !== undefined &&
            this.LeadModel.MaxBudget !== undefined &&
            this.LeadModel.MaxBedrooms !== undefined ;
        return isValid;
    }

    public OnStatusChange(e: any): void {
        if (e.target.checked) {
            this.LeadModel.Status = this.StatusTypes.Active;
        } else {
            this.LeadModel.Status = this.StatusTypes.Inactive;
        }
        this.LeadChange.emit(this.LeadModel);
    }
}
