import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from '../../../Lead.Service';

@Component({
    moduleId: module.id,
    selector: 'pm-lead-row',
    templateUrl: 'lead-row.component.html',
    styleUrls: ['lead-row.component.css']
})
export class LeadRowComponent implements OnInit {
    @Input() Lead: any;
    @Output() OnSearch = new EventEmitter();
    public DetailOpen: boolean;
    public StatusChanging: boolean;

    public constructor(private _router: Router, public Service: LeadService) {
    }

    public ngOnInit() {}

    public ToggleDetail(): void {
        this.DetailOpen = !this.DetailOpen;
    }

    public DuplicateChannel(): void {
        this._router.navigate(['leads', 'new', {duplicate: this.Lead.id}]);
    }

    // public OnDelete(): void {
    //     // let modalInstance = this.ModalService.Confirm(`Are you sure you want to delete the channel ${this.Lead.Name}?`, 'Confirmation', 'OK');
    //     // modalInstance.instance.CloseSubject.subscribe((val) => {
    //         // if (val) {
    //             this.Service.Delete(this.Lead.LeadId, null).subscribe(() => {
    //                 this.OnSearch.emit();
    //             // });
    //         // }
    //     });
    // }
}
