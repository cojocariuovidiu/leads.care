import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
// import { AppSettings } from '../../../../framework-components/Settings/AppSettings';

@Component({
    moduleId: module.id,
    selector: 'lead-letter-group',
    templateUrl: 'lead-letter-group.component.html',
    // providers: [AppSettings]
})
export class LeadLetterGroupComponent implements OnInit {
    @Input() Letter;
    @Input() LetterGroup;

    constructor() {}

    public ngOnInit() {
        const s = this.LetterGroup;
    }
}
