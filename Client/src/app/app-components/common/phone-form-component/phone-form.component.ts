import {
    Component,
    AfterViewInit,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ElementRef
} from '@angular/core';
import { PhoneNumberModel } from '../../../../../../Common/Models/PhoneNumberModel';

@Component({
    moduleId: module.id,
    selector: 'phone-form',
    templateUrl: 'phone-form.component.html'
})
export class PhoneFormComponent implements AfterViewInit {
    @Input() PhoneNumber: PhoneNumberModel;
    @Output() private NumberChange = new EventEmitter<any>();
    @ViewChild('field1') public field1: ElementRef;
    @ViewChild('field2') public field2: ElementRef;
    @ViewChild('field3') public field3: ElementRef;

    public ngAfterViewInit(): void {
    }

    public OnNewDigitEntered(e: any, position: number): void {
        if (e.length === 3) {
            if (position === 1) {
                this.field2.nativeElement.focus();
            }
            if (position === 2) {
                this.field3.nativeElement.focus();
            }
        }
    }
}
