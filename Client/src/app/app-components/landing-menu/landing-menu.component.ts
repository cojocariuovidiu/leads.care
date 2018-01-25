import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-landing-menu',
    templateUrl: 'landing-menu.component.html',
    providers: []
})
export class LandingMenuComponent {
    public MobileOpen: boolean;
    constructor(public _router: Router) { }
}
