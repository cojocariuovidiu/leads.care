import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Neighborhoods } from '../../../../../../Common/Arrays/Neighborhoods';
import { Strings } from '../../../../../../Common/Strings';
import { StatusTypes } from '../../../../../../Common/Enums/StatusTypes';
import { LeadSearchCriteriaModel } from '../../../../../../Common/Models/LeadSearchCriteriaModel';
import { LeadModel } from '../../../../../../Common/Models/LeadModel';
import { PhoneNumberModel } from '../../../../../../Common/Models/PhoneNumberModel';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'lead-form',
    templateUrl: 'lead-form.component.html'
})
export class LeadFormComponent implements OnInit {
    @Input() public SearchMode = false;
    @ViewChild('LeadForm') Form: NgForm;
    @Output() private LeadChange = new EventEmitter<LeadSearchCriteriaModel>();
    public LeadModel = new LeadSearchCriteriaModel();
    public DateSelected: IMyDateModel;
    public Neighborhoods: string[] = Neighborhoods;
    public StatusTypes = StatusTypes;
    public NeighborhoodsCheckboxObject: { [key: string]: boolean } = {};
    public DatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm - dd - yyyy',
        height: '70px',
        width: '350px',
        selectionTxtFontSize: '14px'
    };
    constructor() { }

    public ngOnInit(): void {
        this.LeadModel.Neighborhoods = this.LeadModel.Neighborhoods ? this.LeadModel.Neighborhoods : [];
        this.LeadModel.Phone = this.LeadModel.Phone ? this.LeadModel.Phone : new PhoneNumberModel();
        this.SetInitialStatus();
    }

    public AsyncInit(): void {
        this.SetNeighborhoodCheckboxes();
        this.SetInitialMoveInDate();
    }

    public ClearAll(): void {
        this.LeadModel = new LeadSearchCriteriaModel();
        this.LeadModel.Neighborhoods = [];
        this.ResetNeighborhoodCheckboxes();
        this.SetInitialMoveInDate();
    }

    public OnDateChanged(date: IMyDateModel) {
        if (date.jsdate === null) {
            this.LeadModel.MoveInDate = undefined;
        } else {
            this.LeadModel.MoveInDate = new Date(date.jsdate);
        }
        this.LeadChange.emit(this.LeadModel);
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

    private SetInitialMoveInDate(): void {
        let initDate: any;
        if (this.LeadModel.MoveInDate) {
            const day = new Date(this.LeadModel.MoveInDate).getDate(),
                month = new Date(this.LeadModel.MoveInDate).getMonth() + 1,
                year = new Date(this.LeadModel.MoveInDate).getFullYear();
            initDate = { date: { year: year, month: month, day: day } };
        } else {
            initDate = '';
        }
        this.DateSelected = initDate;
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
