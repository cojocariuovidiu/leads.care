import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'pm-landing-menu',
    templateUrl: 'landing-menu.component.html',
    providers: []
})
export class LandingMenuComponent {
    public MobileOpen: boolean;
    constructor(public _router: Router) { }
}
